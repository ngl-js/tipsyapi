import { Router } from "express";
import fs from "fs";
// Custom Route
const rtGetAssets = Router();

rtGetAssets.get('/getAssets', function(req, res) {
  const frames= fs.readdirSync('./assets/img/frames', {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item =>({name: item.name}))

  const audios= fs.readdirSync('./assets/audio', {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item =>({name: item.name}))
    .sort()

  res.json({ frames, audios });
});


export default rtGetAssets;