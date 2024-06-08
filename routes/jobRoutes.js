const express = require('express');
const { createJob, getJobs, getJobDetails, updateJob, deleteJob } = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createJob);
router.get('/', getJobs);
router.get('/:jobId', getJobDetails);
router.put('/:jobId', authMiddleware, updateJob);
router.delete('/:jobId', authMiddleware, deleteJob);

module.exports = router;
