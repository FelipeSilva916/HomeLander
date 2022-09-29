"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        //userIdx: 1
        email: "demo@user.io",
        username: "Demo-lition",
        hashedPassword: bcrypt.hashSync("password")
      },
      {
        //userIdx: 2
        email: "felipe@user.io",
        username: "Felipe",
        hashedPassword: bcrypt.hashSync("password2")
      },
      {
        //userIdx: 3
        email: "princess@user.io",
        username: "PreppyInfluencer",
        hashedPassword: bcrypt.hashSync("password3")
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      "Users",
      {
        username: {
          [Op.in]: ["Demo-lition", "Felipe", "PreppyInfluencer"]
        }
      },
      {}
    );
  }
};
