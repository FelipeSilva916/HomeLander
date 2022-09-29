const express = require("express");
const router = express.Router();
const { Favorite } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

// ======== POST /api/favorites/:siteId - Add current campsite to favorites ========//
router.post("/:campsiteId", requireAuth, async (req, res) => {
  const { user } = req;
  const campsiteId = req.params.campsiteId;

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

// ======== DELETE /api/favorites/:favoriteID - Delete a favorite by campsite ID ========//

router.delete("/:favoriteId", requireAuth, async (req, res) => {
  const { user } = req;
  const { favoriteId } = req.params;

  if (!favoriteId) {
    const error = new Error("Favorite couldn't be found");
    error.status = 404;
    throw error;
  }

  const favorite = await Favorite.findByPk(favoriteId);

  if (favorite.userId !== user.id) {
    const error = new Error("Unauthorized");
    error.status = 401;
    throw error;
  }

  await favorite.destroy();
  res.json(favorite);
  res.status(201);
});

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

module.exports = router;
