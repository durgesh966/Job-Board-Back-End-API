const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('employer', 'job_seeker'),
    defaultValue: 'employer',
    allowNull: false
  },
  profilePicture: {
    type: DataTypes.STRING
  }
});

module.exports = User;
