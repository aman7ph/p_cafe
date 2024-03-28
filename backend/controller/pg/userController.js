import asyncHandler from "express-async-handler";
import getConnection from "../../config/db-pg.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";
import sendEmail from "../../utils/email.js";
import crypto from "crypto";

const register = async (req, res, next) => {
  const { name, password, email, role } = req.body;

  if (!name || !password || !email) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const client = await getConnection();

  try {
    const checkUserQuery = "SELECT * FROM users WHERE email = $1";
    const { rows } = await client.query(checkUserQuery, [email]);

    if (rows.length > 0) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insertUserQuery =
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *";
    const result = await client.query(insertUserQuery, [
      name,
      email,
      hashedPassword,
      role,
    ]);

    const newUser = result.rows[0];

    if (newUser) {
      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  } finally {
    await client.release();
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  const client = await getConnection();

  try {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      generateToken(res, user.id);
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  } finally {
    await client.release();
  }
};

const logout = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ message: "logout successfuly" });
});

const getUserProfile = async (req, res, next) => {
  const client = await getConnection();
  try {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      req.user.id,
    ]);

    const user = result.rows[0];

    if (user) {
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  } finally {
    await client.release();
  }
};

const getUsers = async (req, res, next) => {
  const client = await getConnection();
  try {
    const result = await client.query("SELECT * FROM users");
    const users = result.rows;
    res.status(200).json(users);
  } catch (error) {
    next(error);
  } finally {
    await client.release();
  }
};

const deleteUser = async (req, res, next) => {
  const client = await getConnection();
  try {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);

    const user = result.rows[0];

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (user.role === "admin") {
      res.status(400);
      throw new Error("You can't delete an admin user");
    }

    await client.query("DELETE FROM users WHERE id = $1", [req.params.id]);

    res.status(200).json({ message: "User removed" });
  } catch (error) {
    next(error);
  } finally {
    await client.release();
  }
};

const getUserById = async (req, res, next) => {
  const client = await getConnection();
  try {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);

    const user = result.rows[0];

    if (user) {
      delete user.password;
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  } finally {
    await client.release();
  }
};

const updateUser = asyncHandler(async (req, res, next) => {
  const { name, email, role } = req.body;
  const { id } = req.params.id;

  const client = await getConnection();
  try {
    const text = `
      UPDATE users
      SET name = $1, email = $2, role = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [name, email, role, id];
    const result = await client.query(text, values);

    if (result.rows.length > 0) {
      const updatedUser = result.rows[0];
      res.status(200).json(updatedUser);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    console.error(err);
    next(err);
  } finally {
    client.release();
  }
});

const updateUserProfile = async (req, res, next) => {
  const { name, email, password } = req.body;
  const client = await getConnection();

  try {
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }

    let query = "UPDATE users SET";
    const values = [];
    Object.keys(updatedFields).forEach((key, index) => {
      query += ` ${key} = $${index + 2},`;
      values.push(updatedFields[key]);
    });

    query = query.slice(0, -1) + " WHERE _id = $1";
    values.unshift(req.user.id);

    await client.query(query, values);

    const updatedUserResult = await client.query(
      "SELECT * FROM users WHERE _id = $1",
      [req.user._id]
    );
    const updatedUser = updatedUserResult.rows[0];

    generateToken(res, updatedUser.id);
    res.status(201).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    next(error);
  } finally {
    await client.release();
  }
};
const forgotePassword = async (req, res, next) => {
  console.log("req.............body");
  const client = await getConnection();
  try {
    const { rows } = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [req.body.email]
    );

    if (rows.length === 0) {
      res.status(404);
      throw new Error("User not found");
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetUrl = `${req.protocol}://localhost:3000/reset/${resetToken}`;
    const message = `Forgot your password? submit a put request with your new password : ${resetUrl}\nIf you didn't forget your password, please ignore this email!`;

    await sendEmail({
      email: rows[0].email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({ message: "Token sent to email!" });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("There was an error sending the email");
  } finally {
    client.release();
  }
};

const reset = async (req, res, next) => {
  if (!req.body.password) {
    res.status(400);
    throw new Error("Please provide a new password");
  }

  const client = await getConnection();
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const { rows } = await client.query(
      "SELECT * FROM users WHERE password_reset_token = $1 AND password_reset_expires > NOW()",
      [hashedToken]
    );

    if (rows.length === 0) {
      res.status(400);
      throw new Error("Token is invalid or has expired");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await client.query(
      "UPDATE users SET password = $1, password_reset_token = NULL, password_reset_expires = NULL WHERE id = $2",
      [hashedPassword, rows[0].id]
    );

    generateToken(res, rows[0].id);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("There was an error resetting the password");
  } finally {
    client.release();
  }
};

export {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  forgotePassword,
  reset,
};
