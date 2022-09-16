"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("CampsiteImages", [
      {
        id: 1,
        userId: 1,
        campsiteId: 1,
        imageUrl:
          "https://homelander.s3.us-west-1.amazonaws.com/littleLakes1.jpg"
      },
      {
        id: 2,
        userId: 1,
        campsiteId: 1,
        imageUrl: "image2"
      },
      {
        id: 3,
        userId: 1,
        campsiteId: 1,
        imageUrl: "image3"
      },
      {
        id: 4,
        userId: 1,
        campsiteId: 2,
        imageUrl:
          "https://homelander.s3.us-west-1.amazonaws.com/moonLitFalls1.jpg"
      },
      {
        id: 5,
        userId: 1,
        campsiteId: 2,
        imageUrl: "image2"
      },
      {
        id: 6,
        userId: 1,
        campsiteId: 2,
        imageUrl: "image3"
      },
      {
        id: 7,
        userId: 1,
        campsiteId: 3,
        imageUrl: "https://homelander.s3.us-west-1.amazonaws.com/patagonia1.jpg"
      },
      {
        id: 8,
        userId: 1,
        campsiteId: 3,
        imageUrl: "image2"
      },
      {
        id: 9,
        userId: 1,
        campsiteId: 3,
        imageUrl: "image3"
      },
      {
        id: 10,
        userId: 2,
        campsiteId: 4,
        imageUrl: "https://homelander.s3.us-west-1.amazonaws.com/teton1.jpg"
      },
      {
        id: 11,
        userId: 2,
        campsiteId: 4,
        imageUrl: "image2"
      },
      {
        id: 12,
        userId: 2,
        campsiteId: 4,
        imageUrl: "image3"
      },
      {
        id: 13,
        userId: 2,
        campsiteId: 5,
        imageUrl:
          "https://homelander.s3.us-west-1.amazonaws.com/deathValley3.jpg"
      },
      {
        id: 14,
        userId: 2,
        campsiteId: 5,
        imageUrl: "image2"
      },
      {
        id: 15,
        userId: 2,
        campsiteId: 5,
        imageUrl: "image3"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CampsiteImages", null, {});
  }
};
