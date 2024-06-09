const multer = require('multer');
const path = require('path');

// Set storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'profilePicture') {
      cb(null, 'uploads/profile_pictures/');
    } else if (file.fieldname === 'resume') {
      cb(null, 'uploads/resumes/');
    } else {
      cb(new Error('Unexpected field'));
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter
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
