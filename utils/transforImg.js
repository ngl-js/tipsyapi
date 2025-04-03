import sharp from "sharp";
import fs from "fs";
import { mergeVideo } from "./transforVideo.js";

export const mergePortrait= async (file_path, params, type) => {
  let star_path= null;

  if (params?.star!='star0')
    star_path = './assets/img/stars/'+ params.star + '-min.png';
  
  let frame_path = './assets/img/frames/'+params.frame;
  let out_path = './upload/'+Date.now() + '.webp';

  const og_file= await sharp(file_path, { failOnError: false })
    .rotate()
    .resize(1400, 2200)
    .toBuffer();

  const frame= await sharp(frame_path)
    .resize(1400, 2200)
    .toBuffer();

  let composite= [{
    input: frame,
    blend: 'over'
  }];

  if (star_path!==null) {
    composite.push({
      input: {
        create:{ 
          width:400, 
          height:100, 
          background:'rgb(0, 0, 0, 0.5)',
          channels:4
        }
      },
      blend: 'over',
      gravity: 'southwest'
    },
    {
      input: star_path,
      blend: 'over',
      gravity: 'southwest'
    })
  }
    
  await sharp(og_file)
    .resize({ fit: 'inside' })
    .composite(composite)
    .sharpen()
    .webp( { quality: 85 } )
    .toFile(out_path);

  let resp;
  if (type==='video') {
    const video_path= await mergeVideo(out_path, params.audio)
    const b64= fs.readFileSync(video_path).toString('base64');
    resp= { type, b64 }
    // Delete video
    fs.unlinkSync(video_path)
  } else {
    const b64= fs.readFileSync(out_path).toString('base64');
    resp= { type, b64 }
  }
  // Delete images
  fs.unlinkSync(file_path)
  fs.unlinkSync(out_path)

  return resp;
}