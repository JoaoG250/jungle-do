import * as Joi from "joi";

export const validationSchema = Joi.object({
  RABBITMQ_URL: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  PORT: Joi.number().default(3004),
});

export const ConfigKeys = {
  RABBITMQ_URL: "RABBITMQ_URL",
  POSTGRES_HOST: "POSTGRES_HOST",
  POSTGRES_PORT: "POSTGRES_PORT",
  POSTGRES_USER: "POSTGRES_USER",
  POSTGRES_PASSWORD: "POSTGRES_PASSWORD",
  POSTGRES_DB: "POSTGRES_DB",
  PORT: "PORT",
} as const;
