"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("CampsiteImages", [
      {
        userId: 1,
        campsiteId: 1,
        imageUrl:
          "https://homelander.s3.us-west-1.amazonaws.com/littleLakes1.jpg"
      },
      {
        userId: 1,
        campsiteId: 1,
        imageUrl:
          "https://homelander.s3.us-west-1.amazonaws.com/littleLakes1.jpg"
      },
      {
        userId: 1,
        campsiteId: 1,
        imageUrl:
          "https://homelander.s3.us-west-1.amazonaws.com/littleLakes1.jpg"
      },
      {
        userId: 1,
        campsiteId: 2,
        imageUrl:
          "https://homelander.s3.us-west-1.amazonaws.com/moonLitFalls1.jpg"
      },
      {
        userId: 1,
        campsiteId: 2,
        imageUrl: "image2"
      },
      {
        userId: 1,
        campsiteId: 2,
        imageUrl: "image3"
      },
      {
        userId: 1,
        campsiteId: 3,
        imageUrl: "https://homelander.s3.us-west-1.amazonaws.com/patagonia1.jpg"
      },
      {
        userId: 1,
        campsiteId: 3,
        imageUrl: "image2"
      },
      {
        userId: 1,
        campsiteId: 3,
        imageUrl: "image3"
      },
      {
        userId: 2,
        campsiteId: 4,
        imageUrl: "https://homelander.s3.us-west-1.amazonaws.com/teton1.jpg"
      },
      {
        userId: 2,
        campsiteId: 4,
        imageUrl: "image2"
      },
      {
        userId: 2,
        campsiteId: 4,
        imageUrl: "image3"
      },
      {
        userId: 2,
        campsiteId: 5,
        imageUrl:
          "https://homelander.s3.us-west-1.amazonaws.com/deathValley3.jpg"
      },
      {
        userId: 2,
        campsiteId: 5,
        imageUrl: "image2"
      },
      {
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
