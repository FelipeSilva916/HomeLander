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
          "https://homelander.s3.us-west-1.amazonaws.com/littleLakes2.jpg"
      },
      {
        userId: 1,
        campsiteId: 1,
        imageUrl:
          "https://homelander.s3.us-west-1.amazonaws.com/littleLakes3.jpg"
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
        imageUrl: "https://www.thesierralight.com/images/xl/moonlightfalls.jpg"
      },
      {
        userId: 1,
        campsiteId: 2,
        imageUrl:
          "https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5350485.jpg"
      },
      {
        userId: 1,
        campsiteId: 3,
        imageUrl: "https://homelander.s3.us-west-1.amazonaws.com/elChalten1.jpg"
      },
      {
        userId: 1,
        campsiteId: 3,
        imageUrl:
          "https://i.natgeofe.com/n/a70f03bc-bef3-4bdf-ab8c-8df7ac83b954/towers-torres-del-paine-national-park-patagonia_square.jpg"
      },
      {
        userId: 1,
        campsiteId: 3,
        imageUrl:
          "https://i.natgeofe.com/n/528dc615-a30a-496f-b005-154995111cb3/torres-del-paine-national-park-patagonia_16x9.jpg?w=1200"
      },
      {
        userId: 2,
        campsiteId: 4,
        imageUrl: "https://homelander.s3.us-west-1.amazonaws.com/teton1.jpg"
      },
      {
        userId: 2,
        campsiteId: 4,
        imageUrl: "https://homelander.s3.us-west-1.amazonaws.com/teton2.jpg"
      },
      {
        userId: 2,
        campsiteId: 4,
        imageUrl: "https://homelander.s3.us-west-1.amazonaws.com/teton3.jpg"
      },
      {
        userId: 2,
        campsiteId: 5,
        imageUrl:
          "https://homelander.s3.us-west-1.amazonaws.com/deathValley1.jpg"
      },
      {
        userId: 2,
        campsiteId: 5,
        imageUrl:
          "https://homelander.s3.us-west-1.amazonaws.com/deathValley2.jpg"
      },
      {
        userId: 2,
        campsiteId: 5,
        imageUrl:
          "https://homelander.s3.us-west-1.amazonaws.com/deathValley3.jpg"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CampsiteImages", null, {});
  }
};
