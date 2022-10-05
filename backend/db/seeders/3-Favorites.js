"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Favorites", [
      {
        userId: 1,
        campsiteId: 1
      },
      {
        userId: 1,
        campsiteId: 2
      },
      {
        userId: 2,
        campsiteId: 3
      },
      {
        userId: 2,
        campsiteId: 2
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Favorites", null, {});
  }
};
