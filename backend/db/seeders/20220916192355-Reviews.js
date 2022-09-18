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
        userId: 1,
        campsiteId: 3,
        body: "This place is amazing, worth the trek!",
        rating: 5
      },
      {
        id: 4,
        userId: 1,
        campsiteId: 4,
        body: "This place is amazing, but hard to get to!",
        rating: 5
      },
      {
        id: 5,
        userId: 1,
        campsiteId: 5,
        body: "Very cool!",
        rating: 4
      },
      {
        id: 6,
        userId: 2,
        campsiteId: 1,
        body: "Must see!!",
        rating: 4
      },
      {
        id: 7,
        userId: 2,
        campsiteId: 2,
        body: "This place is awesome!",
        rating: 4
      },
      {
        id: 8,
        userId: 2,
        campsiteId: 3,
        body: "Nothing like this hidden gem!",
        rating: 4
      },
      {
        id: 9,
        userId: 2,
        campsiteId: 4,
        body: "This place is amazing, worth the trek!",
        rating: 4
      },
      {
        id: 10,
        userId: 2,
        campsiteId: 5,
        body: "Cant wait to go back!",
        rating: 5
      },
      {
        id: 11,
        userId: 3,
        campsiteId: 1,
        body: "So many bugs!!",
        rating: 2
      },
      {
        id: 12,
        userId: 3,
        campsiteId: 2,
        body: "I almost died getting there!",
        rating: 3
      },
      {
        id: 13,
        userId: 3,
        campsiteId: 3,
        body: "They didnt have showers!",
        rating: 2
      },
      {
        id: 14,
        userId: 3,
        campsiteId: 4,
        body: "Way too many tourists and the roads were made of gravel!",
        rating: 2
      },
      {
        id: 15,
        userId: 3,
        campsiteId: 5,
        body: "Too many snakes, I wouldnt go back!",
        rating: 1
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
  }
};
