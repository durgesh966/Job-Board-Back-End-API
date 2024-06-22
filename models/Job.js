const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employer = require('./User');

const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  employerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employer,
      key: 'id'
    }
  }
}, {
  tableName: 'jobs',
  timestamps: true
});

Job.associate = (models) => {
  Job.belongsTo(models.Employer, { foreignKey: 'employerId', as: 'employer' });
};

module.exports = Job;
