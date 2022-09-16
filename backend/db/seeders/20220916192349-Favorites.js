"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Favorites", [
      {
        id: 1,
        userId: 1,
        campsiteId: 1
      },
      {
        id: 2,
        userId: 1,
        campsiteId: 2
      },
      {
        id: 3,
        userId: 2,
        campsiteId: 3
      },
      {
        id: 4,
        userId: 2,
        campsiteId: 2
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Favorites", null, {});
  }
};
