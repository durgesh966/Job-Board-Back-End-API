const Job = require('../models/Job');
const { Op } = require('sequelize');

exports.createJob = async (req, res) => {
  const { title, description, location, category } = req.body;
  const employerId = req.userId; // Assume userId is set by auth middleware
  try {
    const job = await Job.create({ title, description, location, category, employerId });
    console.log(title, description, location, category, employerId);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getJobDetails = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  const { jobId } = req.params;
  const { title, description, location, category } = req.body;
  try {
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    if (job.employerId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await job.update({ title, description, location, category });
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    if (job.employerId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await job.destroy();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getJobs = async (req, res) => {
  const { title, location, category, page = 1, pageSize = 10 } = req.query;
  const where = {};
  if (title) where.title = { [Op.like]: `%${title}%` };
  if (location) where.location = { [Op.like]: `%${location}%` };
  if (category) where.category = { [Op.like]: `%${category}%` };

  try {
    const jobs = await Job.findAndCountAll({
      where,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    res.json({
      totalItems: jobs.count,
      totalPages: Math.ceil(jobs.count / pageSize),
      currentPage: page,
      jobs: jobs.rows,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
