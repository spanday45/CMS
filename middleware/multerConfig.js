const multer = require("multer")

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        // logic to validate the filetype (mimeType)
        const  allowedFileTypes = ['image/png','image/jpeg','image/gif']
        // return console.log(file.mimetype)
        if (!allowedFileTypes.includes(file.mimetype)) { //it will check 

            cb (new Error("invalid filetypes ."))
            return;
            // callback =cb
            // we cannot res.sed in here 
            
        }
            cb(null,"./uploads"); // cb(error,success) cb("Something went wrong")
        },
    filename : function(req,file,cb){
        cb(null,Date.now() + "-" +  file.originalname)
    },
});

module.exports = {
    multer,
    storage 
}