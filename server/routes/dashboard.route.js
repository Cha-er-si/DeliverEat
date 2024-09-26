const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/auth-middleware");
const User = require("../model/User");

router.get("/get-user-data", verifyAccessToken, async (req, res) => {
  try {
    if (req.payload) {
      const user = await User.findById(req.payload.user_id).select("-password");
      return res.json({ user });
    }
  } catch (error) {
    return res.json({ error });
  }
});

module.exports = router;
