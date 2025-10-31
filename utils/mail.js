import { Resend } from "resend";
import { envs } from "../config/envs.js";
import fs from "fs";

const resend = new Resend(envs.RESEND_API_KEY);

export const send_img = async (file_path = "", recipient) => {
  try {
    let _filename = file_path.split("/").pop();
    const attachment = fs.readFileSync(file_path).toString("base64");

    const data = await resend.emails.send({
      from: envs.MAIL_ACC,
      to: [recipient],
      subject: "Galeria Tipsy",
      html: '<p>Imagen generada por Tipsy </br></br> <img src="cid:tipsy-image"/> </p>',
      attachments: [
        {
          content: attachment,
          filename: _filename,
          contentId: "tipsy-image",
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
