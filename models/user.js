const sequelize = require('../utils/db');
const { DataTypes } = require('sequelize');

const UserModel = sequelize.define('users', {
  uid:{
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement:true,
    primaryKey: true,
  },
  username:{
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  password:{
    type: DataTypes.STRING(70),
    allowNull: false,
  },
  sessionId:{
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: null,
  },
  logout:{
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  }
}, {
  timestamps: false,
});

module.exports = UserModel;