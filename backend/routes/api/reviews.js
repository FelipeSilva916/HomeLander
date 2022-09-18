const express = require("express");
const router = express.Router();
const { Review } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const {
  validateReview,
  validateReviewUnique
} = require("../../utils/validation");

// ======== POST /api/reviews/:siteId - Create a new review for a specific campsite ========//
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

// ======== DELETE /api/reviews/:siteId - Delete a review by campsite ID ========//
router.delete("/:siteId", requireAuth, async (req, res) => {
  const { user } = req;
  const campsiteId = req.params.siteId;
  const review = await Review.findOne({
    where: {
      userId: user.id,
      campsiteId
    }
  });
  if (!review) {
    const error = new Error("Review couldn't be found");
    error.status = 404;
    throw error;
  }
  await review.destroy();
  res.json({ message: "Review deleted", statusCode: 200 });
});

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

// ======== GET /api/reviews - Get all reviews in database ========//
router.get("/", async (req, res) => {
  const reviews = await Review.findAll();
  res.json(reviews);
});

module.exports = router;
