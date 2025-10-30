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

  const appids = ["8rlthArOXi", "7h1pHUMlfe", "yok5swuphU", "pRiBast5t2"];
  if (!(!!idx && appids.includes(idx))) {
    res.status(404).json({ error: "Assets not found" });
    return;
  }

  const frames = assetsToArray(`./assets/img/frames/${idx}`);
  const audios = assetsToArray("./assets/audio");

  res.json({ frames, audios });
});

rtGetAssets.get("/getSurveys", function (req, res) {
  const surveys = [
    { appid: "", survey: "https://mxpqsr50oid.typeform.com/to/lTr4sbqV" },
    {
      appid: "8rlthArOXi",
      survey: "https://mxpqsr50oid.typeform.com/to/lTr4sbqV",
    },
    { appid: "7h1pHUMlfe", survey: false },
    {
      appid: "yok5swuphU",
      survey: "https://mxpqsr50oid.typeform.com/to/hUGtcqRz",
    },
    { appid: "pRiBast5t2", survey: false },
  ];
  res.json(surveys);
});

export default rtGetAssets;
