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
    type: DataTypes.STRING,
    allowNull: false
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Application;
