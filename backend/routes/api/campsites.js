const express = require("express");
const router = express.Router();
const { Campsite, Review, CampsiteImage, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateCampsite } = require("../../utils/validation");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");

// ======== POST /api/campsites - Create a new campsite ========//
router.post(
  "/",
  requireAuth,
  singleMulterUpload("previewImage"),
  validateCampsite,
  async (req, res) => {
    const { user } = req;
    const { latitude, longitude, name, description } = req.body;
    const previewImage = await singlePublicFileUpload(req.file);
    const newCampsite = await Campsite.create({
      userId: user.id,
      latitude,
      longitude,
      name,
      description,
      previewImage
    });
    res.json(newCampsite);
    res.status(201);
  }
);

//Create custom validators
// ======== POST /api/campsites/:id/images - Add an image to a campsite ========//
router.post(
  "/:campsiteId/images",
  requireAuth,
  singleMulterUpload("imageUrl"),
  async (req, res) => {
    const { user } = req;
    const { campsiteId } = req.params;

    const campsite = await Campsite.findByPk(campsiteId);
    const imageUrl = await singlePublicFileUpload(req.file);

    if (!campsite) {
      const err = new Error("Campsite not found");
      err.status = 404;
      err.title = "Campsite not found.";
      err.errors = ["The requested campsite could not be found."];
      return next(err);
    }

    const campsiteImage = await CampsiteImage.create({
      campsiteId,
      userId: user.id,
      imageUrl
    });
    res.json(campsiteImage);
    res.status(201);
  }
);

// ======== DELETE /api/campsites/:id/images/:imageId - Delete an image from a campsite ========//
router.delete("/:id/images/:imageId", requireAuth, async (req, res) => {
  const { user } = req;
  const { id, imageId } = req.params;
  const campsite = await Campsite.findByPk(id);
  if (!campsite) {
    res.status(404);
    res.json({ error: "Campsite not found" });
  }

  const campsiteImage = await CampsiteImage.findByPk(imageId);
  if (!campsiteImage) {
    res.status(404);
    res.json({ error: "Campsite image not found" });
  } else if (campsiteImage.userId !== user.id) {
    res.status(403);
    res.json({ error: "Unauthorized" });
  } else {
    const campsiteId = campsiteImage.dataValues.id;
    await campsiteImage.destroy();
    res.json({
      id: campsiteId,
      message: "Campsite image deleted",
      statusCode: 200
    });
  }
});

//========= PUT /api/campsites/:id - Update a single campsite's description =========//
router.put("/:id", requireAuth, async (req, res) => {
  const { user } = req;
  const { description } = req.body;
  const campsiteId = req.params.id;

  const campsite = await Campsite.findByPk(campsiteId, {
    include: [
      {
        model: User
      },
      {
        model: CampsiteImage
      },
      {
        model: Review
      }
    ]
  });

  if (campsite) {
    const reviews = await Review.findAll({
      where: {
        campsiteId: campsite.id
      }
    });
    let sum = 0;
    reviews.forEach((review) => {
      sum += review.rating;
    });
    Math.round((campsite.dataValues.averageRating = sum / reviews.length));
  }

  if (!campsite) {
    const error = new Error("Campsite couldn't be found");
    error.status = 404;
    throw error;
  }

  if (campsite.userId === user.id) {
    await campsite.update({
      description
    });
    res.json(campsite);
  } else {
    const error = new Error("Unauthorized");
    error.status = 403;
    throw error;
  }
});

//========= DELETE /api/campsites/:id - Delete a single campsite =========//
router.delete("/:id", requireAuth, async (req, res) => {
  const { user } = req;
  const campsiteId = req.params.id;
  const campsite = await Campsite.findByPk(campsiteId);

  if (!campsite) {
    const error = new Error("Campsite couldn't be found");
    error.status = 404;
    throw error;
  }

  if (campsite.userId === user.id) {
    await campsite.destroy();
    res.json({ message: "Campsite deleted", statusCode: 200, id: campsiteId });
  } else {
    const error = new Error("Unauthorized");
    error.status = 403;
    throw error;
  }
});

//========= GET /api/campsites/:id - Get a single campsite, include average rating =========//
router.get("/:id", async (req, res) => {
  const campsiteId = req.params.id;

  const campsite = await Campsite.findByPk(campsiteId, {
    include: [
      {
        model: Review
      },
      {
        model: CampsiteImage
      },
      {
        model: User
      }
    ]
  });

  if (!campsite) {
    const error = new Error("Campsite couldn't be found");
    error.status = 404;
    throw error;
  }

  if (campsite) {
    const reviews = await Review.findAll({
      where: {
        campsiteId: campsite.id
      }
    });
    let sum = 0;
    reviews.forEach((review) => {
      sum += review.rating;
    });
    Math.round((campsite.dataValues.averageRating = sum / reviews.length));
  }
  return res.json(campsite);
});

// ======== GET /api/campsites/:campsiteId/images ========//

router.get("/:campsiteId/images", async (req, res) => {
  const { campsiteId } = req.params;
  const campsite = await Campsite.findByPk(campsiteId);
  if (!campsite) {
    res.status(404);
    res.json({ error: "Campsite not found" });
  }
  const campsiteImages = await CampsiteImage.findAll({
    where: {
      campsiteId
    }
  });
  res.json(campsiteImages);
});

//========= GET /api/campsites - Get all campsites =========//
router.get("/", async (req, res) => {
  const campsites = await Campsite.findAll();
  res.json(campsites);
});

module.exports = router;
