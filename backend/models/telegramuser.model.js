'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TelegramUser extends Model {
    static associate(models) {}
  }
  TelegramUser.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chat_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'TelegramUser',
  });
  return TelegramUser;
};
