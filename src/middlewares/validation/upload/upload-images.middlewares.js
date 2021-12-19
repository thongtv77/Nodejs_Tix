const multer = require("multer");
const { getExtensionFile } = require("../../../util/get-extension-file");
//cb : callback
const uploadImageSingle = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./pulic/images");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
      //tên file gửi lên
    },
  });
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const extensionImageList = ["png", "jpg", "jpeg", "gif"];
      const extensionFile = getExtensionFile(file.originalname);
      if(extensionImageList.includes(extensionFile)){
          cb(null, true);

      }else{
          cb(new Error("extension không hợp lệ nha bạn"))
      }
    },
  });
  return upload.single("typeImage");
};

module.exports = {
  uploadImageSingle,
};

//   function cb(err, result) {
//     if (err) throw new Error(err);
//     return result;
//   }
