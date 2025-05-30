import { Router } from "express";
import { assetsToArray } from "../utils/general.js";
// Custom Route
const rtGetAssets = Router();

rtGetAssets.get("/getAssets", function (req, res) {
  const frames = assetsToArray("./assets/img/frames");
  const audios = assetsToArray("./assets/audio");

  res.json({ frames, audios });
});

rtGetAssets.get("/getAssets/:id", function (req, res) {
  const id = req.params.id;
  if (!(!!id && id == "8rlthArOXi")) {
    res.status(404).json({ error: "Assets not found" });
    return;
  }

  const frames = assetsToArray("./assets/img/event/frames");
  const audios = assetsToArray("./assets/audio");

  res.json({ frames, audios });
});

export default rtGetAssets;

