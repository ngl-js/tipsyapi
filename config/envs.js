import "dotenv/config";
import pkg from "env-var";
const { get } = pkg;

export const envs = {
  MAIL_ACC: get("MAIL_ACC").required().asString(),
  MAIL_PASS: get("MAIL_PASS").required().asString(),
  MAIL_SERV: get("MAIL_SERV").required().asString(),

  CORS_ORIGINS: get("CORS_ORIGINS").required().asString(),
  CORS_METHODS: get("CORS_METHODS").required().asString(),

  RECIPIENT_1: get("RECIPIENT_1").required().asString(),
  RECIPIENT_2: get("RECIPIENT_2").required().asString(),

  RESEND_API_KEY: get("RESEND_API_KEY").required().asString(),
};
