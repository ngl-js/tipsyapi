import nodemailer from "nodemailer";
import { envs } from "../config/envs.js";

export const send_img = async (file_path = "", recipient) => {
  let _filename = file_path.split("/").pop();
  const transport = nodemailer.createTransport({
    port: 465,
    service: envs.MAIL_SERV,
    secure: true,
    logger: true,
    secureConnection: false,
    auth: {
      user: envs.MAIL_ACC,
      pass: envs.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  const mailOptions = {
    from: envs.MAIL_ACC, // sender address
    to: recipient, // list of receivers
    subject: "Tipsy images",
    text: "Tipsy imagenes generated",
    attachments: [
      {
        filename: _filename,
        path: file_path,
      },
    ],
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err);
      else console.log(info);
      resolve(true);
    });
  });
};
