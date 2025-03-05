import sharp from "sharp";
import fs from "fs";

export const mergePortrait= async (file_path) => {
  let og_path = file_path,
      og_resized_path = './upload/uploaded'+Date.now() + '.jpg',
      frame_path = './upload/base'+Date.now() + '.png',
      out_path = './upload/'+Date.now() + '.jpg';

  await sharp('./assets/img/frames/happy4.png')
    .resize(800, 1600)
    .toFile(frame_path);

  await sharp(og_path, { failOnError: false })
    .rotate()
    .resize(800, 1600)
    .toFile(og_resized_path)

  const layers= [
    og_resized_path,
    frame_path
  ].map(file => ({ input: file }));
    
  await sharp(layers[0].input)
    .composite(layers)
    .toFile(out_path);

  const b64= fs
    .readFileSync(out_path)
    .toString('base64');

  // Del generated files
  const tmpFilesToDelete= [
    og_path,
    og_resized_path,
    frame_path,
    out_path
  ];
  tmpFilesToDelete.forEach(file_path => {
    fs.unlinkSync(file_path)
  })

  return b64;
}