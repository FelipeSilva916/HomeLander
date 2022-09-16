"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reviews.belongsTo(models.User, {
        foreignKey: "userId"
      });
      Reviews.belongsTo(models.Campsite, {
        foreignKey: "campsiteId"
      });
    }
  }
  Reviews.init(
    {
      id: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      campsiteId: DataTypes.INTEGER,
      body: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Reviews"
    }
  );
  return Reviews;
};
