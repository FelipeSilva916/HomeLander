const router = require("express").Router();
//
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const campsitesRouter = require("./campsites.js");
const myRouter = require("./my.js");
const reviewsRouter = require("./reviews.js");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/campsites", campsitesRouter);
router.use("/my", myRouter);
router.use("/reviews", reviewsRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

//=============== Test Routes ============================//
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: "Demo-lition"
    }
  });
  setTokenCookie(res, user);
  return res.json({ user });
});

// GET /api/restore-user
const { restoreUser } = require("../../utils/auth.js");
router.get("/restore-user", restoreUser, (req, res) => {
  return res.json(req.user);
});

// GET /api/require-auth
const { requireAuth } = require("../../utils/auth.js");
router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});
//
//
//
module.exports = router;
