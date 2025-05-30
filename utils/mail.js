import nodemailer from "nodemailer";

export const send_img = async (file_path = "") => {
  console.log(file_path);
  let _filename = file_path.split("/").pop();
  const transport = nodemailer.createTransport({
    port: 465,
    service: "gmail",
    secure: true,
    logger: true,
    // debug: true,
    secureConnection: false,
    // host: "smtp.gmail.com",
    auth: {
      user: "apptipsy0@gmail.com",
      pass: "tsyp essf hydz uvks",
      // pass: "PhuTrup5+O",
    },
    // secure: false,
    tls: {
      // ciphers: "SSLv3",
      rejectUnauthorized: true,
      // minVersion: "TLSv1.2",
    },
    // requireTLS: true,
  });

  const mailOptions = {
    from: "apptipsy0@gmail.com", // sender address
    to: "jackypeiro@gmail.com", // list of receivers
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
