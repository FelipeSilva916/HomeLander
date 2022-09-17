const { validationResult } = require("express-validator");
const { check } = require("express-validator");

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

module.exports = {
  handleValidationErrors,
  validateCampsite
};
