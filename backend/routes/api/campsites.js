const express = require("express");
const router = express.Router();
const { Campsite } = require("../../db/models");

//test
router.get("/", async (req, res) => {
  const campsites = await Campsite.findAll();
  res.json(campsites);
});

// Get all campsites
// router.get("/campsites", async (req, res) => {});

module.exports = router;
