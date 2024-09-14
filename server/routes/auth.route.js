const {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} = require("../middlewares/auth-middleware");

const router = require("express").Router();

router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.json({ error: "Unauthorized" });

  const userId = await verifyRefreshToken(refreshToken);
  const accessToken = await signAccessToken(userId);
  const refreshTokenSigned = await signRefreshToken(userId);
  return res.json({ accessToken, refreshToken: refreshTokenSigned });
});

module.exports = router;
