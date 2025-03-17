import { Router } from "express";
// Utils
import { upload } from "../utils/multerConfig.js";
import { mergePortrait } from "../utils/transforImg.js";
// Custom Route
const rtMergeImage = Router();

/**
 * Merge images
 */
rtMergeImage.post(
  '/mergeImg', 
  upload.single('photo'), 
  async (req, res)=> {
    
    // Validate file uploaded
    if ( !(req?.file?.fieldname==='photo') ) {
      return res.status(400).send('No files were uploaded.');
    }
    let type

    try {
      (req.body?.type=='true') ? 
        type='video' : type='img'; 
      const generated= await mergePortrait(
        req.file.path,
        req.body,
        type
      );

      console.log(Date.now() + ` ${type} created`);
      res.status(200).json(generated)

    } catch (error) {
      console.log(error);
      res.status(500).json({error})
    }
  
});


export default rtMergeImage;