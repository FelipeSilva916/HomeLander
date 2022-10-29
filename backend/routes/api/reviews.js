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
    const campsiteId = parseInt(req.params.siteId);

    const newReview = await Review.create({
      userId: user.id,
      campsiteId,
      rating,
      body
    });
    const fetchReview = await Review.findOne({
      where: {
        id: newReview.id
      },
      include: {
        model: User
      }
    });
    res.status(201);
    res.json(fetchReview);
  }
);

// ======== DELETE /api/reviews/:siteId - Delete a review by campsite ID ========//
router.delete("/:id", requireAuth, async (req, res) => {
  const { user } = req;
  const reviewId = req.params.id;
  const review = await Review.findByPk(reviewId);

  if (!review) {
    const error = new Error("Review couldn't be found");
    error.status = 404;
    throw error;
  }
  await review.destroy();
  res.json({ id: reviewId, message: "Review deleted", statusCode: 200 });
});

// ======== PUT /api/reviews/:reviewID - Update a review from current user ========//
router.put("/:reviewId", requireAuth, async (req, res) => {
  const { user } = req;
  const { reviewId } = req.params;
  const { rating, body } = req.body;
  const review = await Review.findByPk(reviewId);

  if (!review) {
    const error = new Error("Review couldn't be found");
    error.status = 404;
    throw error;
  }
  if (user.id == review.userId) {
    await review.update({ rating, body });
    const campsiteReviews = await Review.findAll({
      where: {
        campsiteId: review.campsiteId
      },
      include: {
        model: User
      }
    });
    res.json(campsiteReviews);
    // res.json(review);
  } else {
    const error = new Error("You can't update this review");
    error.status = 403;
    throw error;
  }
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
