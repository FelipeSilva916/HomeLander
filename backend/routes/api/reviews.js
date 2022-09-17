const express = require("express");
const router = express.Router();
const { Campsite, Review, CampsiteImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const {
  validateCampsite,
  validateReview,
  validateReviewUnique
} = require("../../utils/validation");

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
router.post(
  "/:siteId",
  requireAuth,
  validateReview,
  validateReviewUnique,
  async (req, res) => {
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
  }
);

// ======== PUT /api/reviews/:id - Update a review ========//
router.put("/:siteId", requireAuth, async (req, res) => {
  const { user } = req;
  const { rating, body } = req.body;
  const reviewId = req.params.siteId;
  const review = await Review.findByPk(reviewId);

  if (!review) {
    const error = new Error("Review couldn't be found");
    error.status = 404;
    throw error;
  }

  if (review.userId === user.id) {
    await review.update({ rating, body });
    res.json(review);
  } else {
    const error = new Error("Unauthorized");
    error.status = 401;
    throw error;
  }
});
