import { Router } from "express";
import QRCode from "qrcode";
// Custom Route
const rtQRCode = Router();

rtQRCode.get("/genQR/:url", async (req, res) => {
  try {
    const url_param = req.params.url;
    const url = `https://${url_param}`;
    const qrCode = await QRCode.toDataURL(url);
    res.send(`<img src="${qrCode}" alt="QR Code"/>`);
  } catch (error) {
    console.error("Error generating QR code:", err);
    res.status(500).send("Internal Server Error");
  }
});

export default rtQRCode;
