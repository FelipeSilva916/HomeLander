"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Campsites", [
      {
        id: 1,
        userId: 1,
        latitude: 37.4003,
        longitude: -118.7531,
        name: "Little Lakes Valley",
        previewImage:
          "https://homelander.s3.us-west-1.amazonaws.com/littleLakes3.jpg"
      },
      {
        id: 2,
        userId: 1,
        latitude: 37.1665,
        longitude: -118.6356,
        name: "Moonlight Falls",
        previewImage:
          "https://homelander.s3.us-west-1.amazonaws.com/moonLitFalls1.jpg"
      },
      {
        id: 3,
        userId: 1,
        latitude: -50.9353,
        longitude: -72.9079,
        name: "Torres De Paine",
        previewImage:
          "https://homelander.s3.us-west-1.amazonaws.com/patagonia1.jpg"
      },
      {
        id: 4,
        userId: 2,
        latitude: 43.70916,
        longitude: 110.5893,
        name: "Grand Teton National Park",
        previewImage: "https://homelander.s3.us-west-1.amazonaws.com/teton1.jpg"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
