"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favorite.belongsTo(models.User, {
        foreignKey: "userId"
      });
      Favorite.belongsTo(models.Campsite, {
        foreignKey: "campsiteId"
      });
    }
  }
  Favorite.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userId: DataTypes.INTEGER,
      campsiteId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Favorite"
    }
  );
  return Favorite;
};
