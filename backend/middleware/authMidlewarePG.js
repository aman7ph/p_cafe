import getConnection from "../config/db-pg.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const client = await getConnection();

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const result = await client.query("SELECT * FROM users WHERE id = $1", [
          decoded.id,
        ]);

        const user = result.rows[0];

        if (user) {
          req.user = { ...user, password: undefined };
          next();
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        throw error;
      } finally {
        client.release();
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("you are not logged in");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
