const express = require('express');
const { applyForJob, getApplications } = require('../controllers/applicationController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, applyForJob);
router.get('/', authMiddleware, getApplications);

module.exports = router;
