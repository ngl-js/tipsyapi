import { Router } from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
// Custom Route
const rtMergeImage = Router();
// Multer file upload config
const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, './upload/')
  },
  filename: (req, file, cb)=> {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})
const upload = multer({ storage: storage });
/**
 * Merge images
 */
rtMergeImage.post('/mergeImg', upload.single('photo'), async (req, res)=> {
  if ( !(req?.file?.fieldname==='photo') ) {
    return res.status(400).send('No files were uploaded.');
  }
  
  let tmp_path = req.file.path,
      og_path = './upload/uploaded'+Date.now() + '.jpg',
      base_path = './upload/base'+Date.now() + '.png',
      out_path = './upload/'+Date.now() + '.jpg';

  await sharp('./assets/img/frames/hb4.png')
    .resize(800, 1600)
    .toFile(base_path);

  await sharp(tmp_path)
    .resize(800, 1600)
    .toFile(og_path)

  const layers= [
    og_path,
    base_path
  ].map(file => ({ input: file }));
    
  await sharp(layers[0].input)
    .composite(layers)
    .toFile(out_path);

  const b64= fs
    .readFileSync(out_path)
    .toString('base64');
 
  res.status(200).json({b64})
});


export default rtMergeImage;