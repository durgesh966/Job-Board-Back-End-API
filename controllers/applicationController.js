const Application = require('../models/Application');
const transporter = require('../config/email');
const Job = require('../models/Job');
const User = require('../models/User');

exports.applyForJob = async (req, res) => {
  const { jobId, coverLetter } = req.body;
  const userId = req.userId;
  const resume = req.file ? req.file.path : null;

  try {
    const application = await Application.create({ jobId, userId, resume, coverLetter });

    // Send email notification
    const job = await Job.findByPk(jobId);
    const employer = await User.findByPk(job.employerId);
    const user = await User.findByPk(userId);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: employer.email,
      subject: 'New Job Application',
      text: `${user.username} has applied for the position of ${job.title}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getApplications = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const employerId = req.userId;
  try {
    const applications = await Application.findAndCountAll({
      include: [{
        model: Job,
        where: { employerId }
      }],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    res.json({
      totalItems: applications.count,
      totalPages: Math.ceil(applications.count / pageSize),
      currentPage: page,
      applications: applications.rows,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.applyForJob = async (req, res) => {
  const { jobId, resume, coverLetter } = req.body;
  const userId = req.userId;
  try {
    const application = await Application.create({ jobId, userId, resume, coverLetter });

    // Send email notification
    const job = await Job.findByPk(jobId);
    const employer = await User.findByPk(job.employerId);
    const user = await User.findByPk(userId);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: employer.email,
      subject: 'New Job Application',
      text: `${user.username} has applied for the position of ${job.title}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json(application);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};