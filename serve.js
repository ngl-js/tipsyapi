import "dotenv/config";
import express from "express";

import cors from "cors";
const __dirname = import.meta.dirname;
// cors
import { corsOptions } from "./config/cors.config.js";
// Routes
import rtMergeImage from "./routes/mergeImage.routes.js";
import rtGetAssets from "./routes/getAssets.routes.js";
import rtQRCode from "./routes/qrcode.route.js";
import { envs } from "./config/envs.js";

const app = express();
const server = express();
const port = envs.PORT || 3013;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/upload"));
app.use(express.static(__dirname + "/assets"));
// Custom routes
app.use(rtMergeImage, rtGetAssets, rtQRCode);

app.get("/", function (req, res) {
  res.status(404).json({ error: "Not allowed" });
});
server.use("/tipsyAPI", cors(corsOptions), app);

const srv = server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

srv.keepAliveTimeout = 60 * 1000 * 5;
srv.headersTimeout = 61 * 1000 * 5;
