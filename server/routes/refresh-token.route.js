const router = require("express").Router();
const {
  verifyRefreshToken,
  signAccessToken,
} = require("../middlewares/auth-middleware");

router.get("/", async (req, res) => {
  try {
    const id = await verifyRefreshToken(process.env.JWT_REFRESH_TOKEN);
    const accessToken = await signAccessToken(id);

    process.env.JWT_ACCESS_TOKEN = accessToken;

    return res.json({ trans: "success" });
  } catch (error) {
    return res.json({ error });
  }
});

module.exports = router;
