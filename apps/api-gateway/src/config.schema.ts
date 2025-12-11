import * as Joi from "joi";

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  RABBITMQ_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.number().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRATION_TIME: Joi.number().required(),
});

export const ConfigKeys = {
  PORT: "PORT",
  RABBITMQ_URL: "RABBITMQ_URL",
  JWT_SECRET: "JWT_SECRET",
  JWT_EXPIRATION_TIME: "JWT_EXPIRATION_TIME",
  JWT_REFRESH_SECRET: "JWT_REFRESH_SECRET",
  JWT_REFRESH_EXPIRATION_TIME: "JWT_REFRESH_EXPIRATION_TIME",
} as const;
