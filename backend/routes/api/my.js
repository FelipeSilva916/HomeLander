const express = require("express");
const router = express.Router();
const {
  Campsite,
  Review,
  CampsiteImage,
  Favorite
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateCampsite } = require("../../utils/validation");

// ======== GET /api/my/campsites - Get all campsites for a user ========//
router.get("/campsites", requireAuth, async (req, res) => {
  const { user } = req;
  const campsites = await Campsite.findAll({
    where: {
      userId: user.id
    }
  });
  res.json(campsites);
});

// ======== GET /api/my/favorites - Get all favorites for a user ========//
router.get("/favorites", requireAuth, async (req, res) => {
  const { user } = req;
  const favorites = await Favorite.findAll({
    where: {
      userId: user.id
    }
  });
  res.json(favorites);
});

// ======== GET /api/my/reviews - Get all reviews for a user ========//
router.get("/reviews", requireAuth, async (req, res) => {
  const { user } = req;
  const reviews = await Review.findAll({
    where: {
      userId: user.id
    }
  });
  res.json(reviews);
});

module.exports = router;
