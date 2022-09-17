const express = require("express");
const router = express.Router();
const { Campsite } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

// ======== POST /api/campsites - Create a new campsite ========//
router.post("/", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { latitude, longitude, name, previewImage, description } = req.body;
  console.log(user);
  const newCampsite = await Campsite.create({
    userId: user.id,
    latitude,
    longitude,
    name,
    previewImage,
    description
  });
  res.json(newCampsite);
});

//========= GET /api/campsites - Get all campsites =========//
router.get("/", async (req, res) => {
  const campsites = await Campsite.findAll();
  res.json(campsites);
});

//========= GET /api/campsites/:id - Get a single campsite =========//
router.get("/:id", async (req, res) => {
  const campsite = await Campsite.findByPk(req.params.id);
  res.json(campsite);
});

module.exports = router;
