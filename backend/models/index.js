const Attendance = require('./attendance.model');
const TelegramUser = require('./telegramuser.model');
const sequelize = require('../config/db');

module.exports = {
  Attendance,
  TelegramUser,
  sequelize
};
