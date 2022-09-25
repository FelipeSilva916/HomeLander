const express = require("express");
const router = express.Router();
const { Review, User } = require("../../db/models");
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
router.delete("/:id", requireAuth, async (req, res) => {
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

// ======== PUT /api/reviews/:siteId - Update a review from current user ========//
router.put("/:siteId", requireAuth, async (req, res) => {
  const { user } = req;
  const { rating, body } = req.body;
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
  await review.update({ rating, body });
  res.json({ message: "Review updated", statusCode: 200 });
});

// ======== GET /api/reviews/:sitId - Get all reviews for a campsite ========//
router.get("/:siteId", async (req, res) => {
  const campsiteId = req.params.siteId;
  const reviews = await Review.findAll({
    where: {
      campsiteId
    },
    include: {
      model: User
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
