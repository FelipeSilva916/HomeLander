const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const { Campsite, Review } = require("../db/models");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

// === Validate a campsite creation === //
const validateCampsite = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a name for your campsite.")
    .isLength({ max: 50 })
    .withMessage("Name must not be more than 50 characters long."),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a description for your campsite.")
    .isLength({ max: 500 })
    .withMessage("Description must not be more than 500 characters long."),
  check("latitude")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a latitude for your campsite.")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90."),
  check("longitude")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a longitude for your campsite.")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180."),
  handleValidationErrors
];

// === Validate a review creation === //
const validateReview = [
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a body for your review.")
    .isLength({ max: 500 })
    .withMessage("Review must not be more than 500 characters long."),
  check("rating")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a rating for your review.")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5."),
  handleValidationErrors
];

// User already create a review for this campsite
const validateReviewUnique = async (req, res, next) => {
  const { user } = req;
  const { siteId } = req.params;
  const review = await Review.findOne({
    where: {
      userId: user.id,
      campsiteId: siteId
    }
  });
  if (review) {
    const error = new Error("You have already reviewed this campsite");
    error.status = 400;
    throw error;
  }
  next();
};

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateCampsite,
  validateReview,
  validateReviewUnique,
  validateSignup
};
