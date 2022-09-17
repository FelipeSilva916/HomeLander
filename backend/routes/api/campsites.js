const express = require("express");
const router = express.Router();
const { Campsite, Review, CampsiteImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateCampsite } = require("../../utils/validation");

// ======== POST /api/campsites - Create a new campsite ========//
router.post("/", requireAuth, validateCampsite, async (req, res) => {
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
  res.status(201);
});

//========= GET /api/campsites - Get all campsites =========//
router.get("/", async (req, res) => {
  const campsites = await Campsite.findAll();
  res.json(campsites);
});

//========= GET /api/campsites/:id - Get a single campsite =========//
router.get("/:id", async (req, res) => {
  const campsiteId = req.params.id;
  const campsite = await Campsite.findByPk(campsiteId, {
    include: [
      {
        model: Review
      },
      {
        model: CampsiteImage
      }
    ]
  });

  res.json(campsite);
});

//========= PUT /api/campsites/:id - Update a single campsite =========//
router.put("/:id", requireAuth, validateCampsite, async (req, res) => {
  const { user } = req;
  const { latitude, longitude, name, previewImage, description } = req.body;
  const songId = req.params.id;

  const campsite = await Campsite.findByPk(songId);

  if (!campsite) {
    const error = new Error("Campsite couldn't be found");
    error.status = 404;
    throw error;
  }

  if (campsite.userId === user.id) {
    await campsite.update({
      latitude,
      longitude,
      name,
      previewImage,
      description
    });
    res.json(campsite);
  } else {
    const error = new Error("Unauthorized");
    error.status = 403;
    throw error;
  }
});

//========= DELETE /api/campsites/:id - Delete a single campsite =========//
router.delete("/:id", requireAuth, async (req, res) => {
  const { user } = req;
  const campsiteId = req.params.id;
  const campsite = await Campsite.findByPk(campsiteId);

  if (!campsite) {
    const error = new Error("Campsite couldn't be found");
    error.status = 404;
    throw error;
  }

  if (campsite.userId === user.id) {
    await campsite.destroy();
    res.json({ message: "Campsite deleted", statusCode: 200 });
  } else {
    const error = new Error("Unauthorized");
    error.status = 403;
    throw error;
  }
});

module.exports = router;
