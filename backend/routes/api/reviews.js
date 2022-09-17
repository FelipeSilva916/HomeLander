const express = require("express");
const router = express.Router();
const { Campsite, Review, CampsiteImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateCampsite } = require("../../utils/validation");

// ======== GET /api/reviews/:sitId - Get all reviews for a campsite ========//
router.get("/:siteId", async (req, res) => {
  const campsiteId = req.params.siteId;
  const reviews = await Review.findAll({
    where: {
      campsiteId
    }
  });
  res.json(reviews);
});

module.exports = router;

// ======== POST /api/reviews/:siteId - Create a new review ========//
router.post("/:siteId", requireAuth, async (req, res) => {
  const { user } = req;
  const { rating, body } = req.body;
  const campsiteId = req.params.siteId;
  const newReview = await Review.create({
    userId: user.id,
    campsiteId,
    rating,
    body
  });
  res.json(newReview);
  res.status(201);
});
