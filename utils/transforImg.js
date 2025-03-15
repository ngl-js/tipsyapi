import sharp from "sharp";
import fs from "fs";
import { mergeVideo } from "./transforVideo.js";

export const mergePortrait= async (file_path, params, type) => {
  let frame_path = './assets/img/frames/'+params.frame;
  let out_path = './upload/'+Date.now() + '.jpg';

  const og_file= await sharp(file_path, { failOnError: false })
    .rotate()
    .resize(1400, 2200)
    .toBuffer();

  const frame= await sharp(frame_path)
    .resize(1400, 2200)
    .toBuffer();
    
  await sharp(og_file)
    .resize({ fit: 'inside' })
    .composite([{
      input: frame,
      blend: 'over'
    }])
    .toFile(out_path);

  let resp;
  if (type==='video') {
    const streamUrl= await mergeVideo(out_path, params.audio)
    resp= { type, streamUrl }
  } else {
    const b64= fs.readFileSync(out_path).toString('base64');
    resp= { type, b64 }
  }

  fs.unlinkSync(file_path)
  fs.unlinkSync(out_path)

  return resp;
}