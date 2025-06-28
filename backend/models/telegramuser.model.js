const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TelegramUser = sequelize.define("TelegramUser", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chat_id: {
    type: DataTypes.BIGINT,
    unique: true,
  }
});

module.exports = TelegramUser;
