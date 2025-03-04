import { Router } from "express";
// import images from "images";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
// import os from "os";
// Custom
const rtMergeImage = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})
const upload = multer({ storage: storage });
/**
 * Merge images
 */
rtMergeImage.get('/mergeImage', async (req, res)=> {
  res.json('Hola');
});


rtMergeImage.get('/', function(req, res) {
  res.send('<form method="post" enctype="multipart/form-data" action="/tipsyAPI/upload"><input type="file" name="photo" /><input type="submit" /></form>');
});

rtMergeImage.post('/upload', upload.single('photo'), async (req, res)=> {

  console.log("file: ", req?.file);
  if ( !(req?.file?.fieldname==='photo') ) {
    return res.status(400).send('No files were uploaded.');
  }
  
  let tmp_path = req.file.path,
      og_path = './upload/uploaded'+Date.now() + '.jpg',
      base_path = './upload/base'+Date.now() + '.png',
      out_path = './upload/'+Date.now() + '.jpg',
      photo;

  await sharp('./img/hb4.png')
    .resize(400, 800)
    .toFile(base_path);

  await sharp(tmp_path)
    .resize(400, 800)
    .toFile(og_path)

  const layers= [
    og_path,
    base_path
  ].map(file => ({ input: file }));
    
  await sharp(layers[0].input)
    .composite(layers)
    .toFile(out_path);
  // photo = images(tmp_path);
  // console.log(photo);
  
  // photo.size(800)
  //     .draw(images('./img/hb4.png'), 800 - 421, photo.height() - 117)
  //     .save(out_path, {
  //     quality: 80
  // });

  fs.unlink(tmp_path, function(err) {
    console.log('unlinking');
    
      if (err) throw err;
      res.send('<a href="/" title="upload"><img src="/tipsyAPI/' + path.basename(out_path) + '" /></a>');
  });
});



export default rtMergeImage;