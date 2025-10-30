import "dotenv/config";
import pkg from "env-var";
const { get } = pkg;

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  MAIL_ACC: get("MAIL_ACC").required().asString(),
  MAIL_PASS: get("MAIL_PASS").required().asString(),
  MAIL_SERV: get("MAIL_SERV").required().asString(),

  CORS_ORIGIN: get("CORS_ORIGIN").required().asString(),

  RECIPIENT_1: get("RECIPIENT_1").required().asString(),
  RECIPIENT_2: get("RECIPIENT_2").required().asString(),
};
