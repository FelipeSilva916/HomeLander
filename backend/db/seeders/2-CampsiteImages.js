"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("CampsiteImages", [
      {
        userId: 1,
        campsiteId: 1,
        imageUrl: "https://u.cubeupload.com/felipe916/DSC3823edit.jpg"
      },
      {
        userId: 1,
        campsiteId: 1,
        imageUrl: "https://u.cubeupload.com/felipe916/DSC4000Edit.jpg"
      },
      {
        userId: 1,
        campsiteId: 1,
        imageUrl: "https://u.cubeupload.com/felipe916/littleLakes3.jpg"
      },
      {
        userId: 1,
        campsiteId: 2,
        imageUrl: "https://u.cubeupload.com/felipe916/TLC5549Editcopy.jpg"
      },
      {
        userId: 1,
        campsiteId: 2,
        imageUrl: "https://www.thesierralight.com/images/xl/moonlightfalls.jpg"
      },
      {
        userId: 1,
        campsiteId: 2,
        imageUrl: "https://u.cubeupload.com/felipe916/MoonlightFalls.jpg"
      },
      {
        userId: 1,
        campsiteId: 3,
        imageUrl: "https://u.cubeupload.com/felipe916/DSC1928Edit.jpg"
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
        imageUrl: "https://u.cubeupload.com/felipe916/DSC2025HDR.jpg"
      },
      {
        userId: 2,
        campsiteId: 4,
        imageUrl: "https://u.cubeupload.com/felipe916/DSC0767HDREdit.jpg"
      },
      {
        userId: 2,
        campsiteId: 4,
        imageUrl: "https://u.cubeupload.com/felipe916/ALI3656Edit.jpg"
      },
      {
        userId: 2,
        campsiteId: 4,
        imageUrl: "https://homelander.s3.us-west-1.amazonaws.com/teton3.jpg"
      },
      {
        userId: 2,
        campsiteId: 5,
        imageUrl: "https://u.cubeupload.com/felipe916/DSC1736HDR.jpg"
      },
      {
        userId: 2,
        campsiteId: 5,
        imageUrl: "https://u.cubeupload.com/felipe916/deathValley2.jpg"
      },
      {
        userId: 2,
        campsiteId: 5,
        imageUrl: "https://u.cubeupload.com/felipe916/DSC0892Edit.jpg"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CampsiteImages", null, {});
  }
};
