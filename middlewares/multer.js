const multer = require('multer');
const path = require('path');

// set file path for Profile Picture And Resume And Cover Latter(Optional) 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'profilePicture') {
      cb(null, 'uploads/profile_pictures/');
    } else if (file.fieldname === 'resume') {
      cb(null, 'uploads/resumes/');
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


// filtering file with the help of there Extention Name
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|pdf/;
  const mimetype = allowedFileTypes.test(file.mimetype);
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only .jpeg, .jpg, .png, and .pdf formats allowed!'));
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
