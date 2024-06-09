const express = require('express');
const { applyForJob, getApplications } = require('../controllers/applicationController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');
const router = express.Router();

router.post('/', authMiddleware, upload.single('resume'), applyForJob);
router.get('/', authMiddleware, getApplications);

module.exports = router;
