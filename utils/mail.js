import { Resend } from "resend";
import { envs } from "../config/envs.js";
import fs from "fs";

const resend = new Resend(envs.RESEND_API_KEY);

export const send_img = async (file_path = "", recipient) => {
  try {
    let _filename = file_path.split("/").pop();
    const attachment = fs.readFileSync(file_path).toString("base64");

    console.log("Sending email...");
    const data = await resend.emails.send({
      from: envs.MAIL_ACC,
      to: [recipient],
      subject: "Galeria Tipsy",
      html: "<p>Imagen generada por Tipsy</p>",
      attachments: [
        {
          content: attachment,
          filename: _filename,
        },
      ],
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Resend API error:", error);
    throw error;
  }
};
