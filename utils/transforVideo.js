import Ffmpeg from "fluent-ffmpeg";

export const mergeVideo= async (file_path, audio_file) => {
  let audio_path = './assets/audio/'+audio_file;
  let out_path = './upload/'+Date.now() + '.mp4';

  const makevideo= new Promise((resolve)=> {
    let newMp4 = Ffmpeg();
    newMp4
      .input(file_path)
      .addInput(audio_path)
      .size('50%')
      .duration(15)
      .save(out_path)
      .on('error', (err, stdout, stderr) => {
        console.log('An error occurred: ' + err.message, err, stderr);
      })
      .on('end', () => {
        resolve(out_path);
      });
  })

  const out_video= await makevideo.then(data=> (data));
  return out_video;
}
