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
        previewImage: "https://u.cubeupload.com/felipe916/TLC7312HDRPano.jpg",
        description: "Description for Little Lakes Valley"
      },
      {
        //campsite 2
        userId: 1,
        latitude: 37.1665,
        longitude: -118.6356,
        name: "Moonlight Falls",
        previewImage: "https://u.cubeupload.com/felipe916/TLC5373Edit.jpg",
        description: "Description for Moonlight Falls"
      },
      {
        //campsite 3
        userId: 1,
        latitude: -50.9353,
        longitude: -72.9079,
        name: "Torres Del Paine",
        previewImage: "https://u.cubeupload.com/felipe916/DSC5130Edit.jpg",
        description: "Description for Torres De Paine"
      },
      {
        //campsite 4
        userId: 2,
        latitude: 43.70916,
        longitude: -110.5893,
        name: "Grand Teton National Park",
        previewImage: "https://u.cubeupload.com/felipe916/DSC0767HDREdit.jpg",
        description: "Description for Grand Teton National Park"
      },
      {
        //campsite 5
        userId: 2,
        latitude: 36.6374,
        longitude: -117.5739,
        name: "Death Valley",
        previewImage: "https://u.cubeupload.com/felipe916/DSC8569Edit.jpg",
        description: "Description for Death Valley"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Campsites", null, {});
  }
};
