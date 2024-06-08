const express = require('express');
const { applyForJob, getApplications } = require('../controllers/applicationController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/multer');
const router = express.Router();

router.post('/', authMiddleware, uploadMiddleware.single('resume'), applyForJob);
router.get('/', authMiddleware, getApplications);

module.exports = router;
