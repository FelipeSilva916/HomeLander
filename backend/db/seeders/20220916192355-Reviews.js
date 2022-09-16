"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Reviews", [
      {
        id: 1,
        userId: 1,
        campsiteId: 1,
        body: "This place is awesome!",
        rating: 5
      },
      {
        id: 2,
        userId: 1,
        campsiteId: 2,
        body: "Nothing like this hidden gem!",
        rating: 5
      },
      {
        id: 3,
        userId: 2,
        campsiteId: 3,
        body: "This place is amazing, worth the trek!",
        rating: 5
      },
      {
        id: 4,
        userId: 2,
        campsiteId: 2,
        body: "This place is amazing, but hard to get to!",
        rating: 5
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
  }
};
