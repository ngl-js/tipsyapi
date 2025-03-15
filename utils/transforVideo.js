import { Editframe } from "@editframe/editframe-js";

export const mergeVideo= async (file_path, audio_file) => {
  let audio_path = './assets/audio/'+audio_file;

  const editframe = new Editframe({
    // clientId: process.env.EDITFRAMES_CLIENT,
    token: process.env.EDITFRAMES_TOKEN
  })

  const composition = await editframe.videos.new({
    dimensions: {
      height: 1900,
      width: 1100,
    },
    duration: 10
  })
  await composition.addImage(file_path, {
    size: { format: 'fit' },
  })
  await composition.addAudio(audio_path)
  const video = await composition.encodeSync();

  if (video.isFailed)
    throw new Error("Error al generar video");
  
  return video.downloadUrl;
}
