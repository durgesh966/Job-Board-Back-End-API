const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define('Application', {
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  resume: {
    type: DataTypes.STRING
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Application;
