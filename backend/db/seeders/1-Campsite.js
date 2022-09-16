"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Campsites", [
      {
        //campsite 1
        userId: 1,
        latitude: 37.4003,
        longitude: -118.7531,
        name: "Little Lakes Valley",
        previewImage:
          "https://homelander.s3.us-west-1.amazonaws.com/littleLakes3.jpg",
        description: "Description for Little Lakes Valley"
      },
      {
        userId: 1,
        latitude: 37.1665,
        longitude: -118.6356,
        name: "Moonlight Falls",
        previewImage:
          "https://homelander.s3.us-west-1.amazonaws.com/moonLitFalls1.jpg",
        description: "Description for Moonlight Falls"
      },
      {
        userId: 1,
        latitude: -50.9353,
        longitude: -72.9079,
        name: "Torres De Paine",
        previewImage:
          "https://homelander.s3.us-west-1.amazonaws.com/patagonia1.jpg",
        description: "Description for Torres De Paine"
      },
      {
        userId: 2,
        latitude: 43.70916,
        longitude: 110.5893,
        name: "Grand Teton National Park",
        previewImage:
          "https://homelander.s3.us-west-1.amazonaws.com/teton1.jpg",
        description: "Description for Grand Teton National Park"
      },
      {
        userId: 2,
        latitude: 36.6374,
        longitude: -117.5739,
        name: "Death Valley",
        previewImage:
          "https://homelander.s3.us-west-1.amazonaws.com/deathValley3.jpg",
        description: "Description for Death Valley"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Campsites", null, {});
  }
};
