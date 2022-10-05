"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: "userId"
      });
      Review.belongsTo(models.Campsite, {
        foreignKey: "campsiteId"
      });
    }
  }
  Review.init(
    {
      userId: DataTypes.INTEGER,
      campsiteId: DataTypes.INTEGER,
      body: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Review"
    }
  );
  return Review;
};
