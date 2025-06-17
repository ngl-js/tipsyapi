import { Router } from "express";
import { assetsToArray } from "../utils/general.js";
// Custom Route
const rtGetAssets = Router();

rtGetAssets.get("/getAssets", function (req, res) {
  const frames = assetsToArray("./assets/img/frames/standar");
  const audios = assetsToArray("./assets/audio");

  res.json({ frames, audios });
});

rtGetAssets.get("/getAssets/:id", function (req, res) {
  const idx = req.params.id;

  const appids = ["8rlthArOXi", "7h1pHUMlfe", "yok5swuphU"];
  if (!(!!idx && appids.includes(idx))) {
    res.status(404).json({ error: "Assets not found" });
    return;
  }

  const frames = assetsToArray(`./assets/img/frames/${idx}`);
  const audios = assetsToArray("./assets/audio");

  res.json({ frames, audios });
});

export default rtGetAssets;
