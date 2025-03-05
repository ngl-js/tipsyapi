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

    console.log(req.body);
    
    const b64= await mergePortrait(req.file.path);
  
    res.status(200).json({b64})
});


export default rtMergeImage;