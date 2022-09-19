"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Campsite extends Model {
    static associate(models) {
      Campsite.belongsTo(models.User, {
        foreignKey: "userId"
      });
      Campsite.hasMany(models.Review, {
        foreignKey: "campsiteId"
      });
      Campsite.hasMany(models.CampsiteImage, {
        foreignKey: "campsiteId"
      });
      Campsite.hasMany(models.Favorite, {
        foreignKey: "campsiteId"
      });
    }
  }
  Campsite.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userId: DataTypes.INTEGER,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      name: DataTypes.STRING,
      previewImage: DataTypes.STRING,
      description: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Campsite"
    }
  );
  return Campsite;
};
