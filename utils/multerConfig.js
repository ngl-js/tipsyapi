import multer from "multer";

// Multer file upload config
const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, './upload/')
  },
  filename: (req, file, cb)=> {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})
export const upload = multer({ storage: storage });