import Joi from "joi";

export const orderValidation = (req, res, next) => {
  const schema = Joi.object({
    owner: Joi.string().required().min(3).max(20),
    phoneNumber: Joi.string().required().min(10).max(10),
    ariveTime: Joi.string()
      .pattern(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/)
      .required()
      .error(
        new Error(
          "Invalid arrival time format. Please use HH:MM (e.g., 10:30)."
        )
      ),
  }).options({ stripUnknown: true });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};
