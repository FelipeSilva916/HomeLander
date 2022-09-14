const express = require("express");
const router = express.Router();
const apiRouter = require("./api");
//
router.use("/api", apiRouter);
//
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken
  });
});

router.get("/", (req, res) => {
  res.send("Welcome To My App 👋🏼");
});

module.exports = router;
