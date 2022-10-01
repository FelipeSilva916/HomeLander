"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CampsiteImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CampsiteImage.belongsTo(models.Campsite, {
        foreignKey: "campsiteId"
      });
      CampsiteImage.belongsTo(models.User, {
        foreignKey: "userId"
      });
    }
  }
  CampsiteImage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userId: DataTypes.INTEGER,
      campsiteId: DataTypes.INTEGER,
      imageUrl: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: "CampsiteImage"
    }
  );
  return CampsiteImage;
};
