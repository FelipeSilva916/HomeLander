const express = require("express");
const router = express.Router();
const {
  Campsite,
  Review,
  CampsiteImage,
  Favorite
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

// ======== GET /api/favorites/:userId - Get all favorites for a user ========//
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const favorites = await Favorite.findAll({
    where: {
      userId
    }
  });
  res.json(favorites);
});

// ======== POST /api/favorites/:siteId - Add current campsite to favorites ========//
router.post("/:siteId", requireAuth, async (req, res) => {
  const { user } = req;
  const campsiteId = req.params.siteId;

  if (!campsiteId) {
    const error = new Error("Campsite couldn't be found");
    error.status = 404;
    throw error;
  }

  const newFavorite = await Favorite.create({
    userId: user.id,
    campsiteId
  });
  res.json(newFavorite);
  res.status(201);
});

// ======== DELETE /api/favorites/:siteId - Delete a favorite by campsite ID ========//
router.delete("/:siteId", requireAuth, async (req, res) => {
  const { user } = req;
  const campsiteId = req.params.siteId;
  const favorite = await Favorite.findOne({
    where: {
      userId: user.id,
      campsiteId
    }
  });
  if (!favorite) {
    const error = new Error("Favorite couldn't be found");
    error.status = 404;
    throw error;
  }
  await favorite.destroy();
  res.json({ message: "Favorite deleted", statusCode: 200 });
});

module.exports = router;
