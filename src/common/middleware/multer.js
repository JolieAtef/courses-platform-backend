import multer from "multer";
import path from "path";


export const uploadImage = (file)=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/images')
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' + file.originalname)
        }
    })

    const upload = multer({ storage: storage })
    return upload
}



export const uploadFile = (file)=>{ 
    let mimetype=""
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          mimetype= file.mimetype
          if(file.mimetype.startsWith("video/")){
            cb(null, 'uploads/videos')
          }else if(file.mimetype === "application/pdf"){
            cb(null, 'uploads/pdfs')
          }
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' + file.originalname)
        }
    })

    const fileFilter = (req, file, cb) => {
      const allowedExt = [".mp4", ".mkv", ".webm",".pdf"];
      const ext = path.extname(file.originalname).toLowerCase();
      console.log(ext)
      if(allowedExt.includes(ext)){
        cb(null, true);
      }else{
        cb(new Error("Only mp4, mkv, webm, and pdf files allowed"), false);
      }
    }
 
    let limits
    if(mimetype.startsWith("video/")){
      limits = {fileSize: 500 * 1024 * 1024 };
    }else if(mimetype === "application/pdf"){
      limits = {fileSize: 20 * 1024 *1024};
    }

    const upload = multer({ storage, fileFilter, limits })
    return upload
}