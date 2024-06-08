const Application = require('../models/Application');

exports.applyForJob = async (req, res) => {
  const { jobId, resume, coverLetter } = req.body;
  const userId = req.userId;
  try {
    const application = await Application.create({ jobId, userId, resume, coverLetter });
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

