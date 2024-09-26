const router = require("express").Router();
const Admin = require("../model/Admin");
const bcyrpt = require("bcrypt");

const {
  verifyAccessToken,
  signAccessToken,
  signRefreshToken,
} = require("../middlewares/auth-middleware");

const adminUserExists = async (email) => {
  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

  if (admin) {
    return true;
  } else {
    return false;
  }
};

const isPasswordNull = (password) => {
  if (password == "") {
    return false;
  } else if (password == null) {
    return false;
  } else {
    return true;
  }
};

router.post("/register", async (req, res) => {
  try {
    const { shopName, email, username, password } = req.body;

    if (await adminUserExists(req.body.email)) {
      return res
        .status(409)
        .json({ trans: "invalid", error: "Email already exists." });
    } else {
      if (password == "" && password == null) {
        return res
          .status(500)
          .json({ trans: "invalid", error: "Password is required" });
      }

      await new Admin({
        shopName,
        email,
        username,
        password,
        role: "admin",
      })
        .save()
        .then(async (user) => {
          const accessToken = await signAccessToken(user._id);
          const refreshToken = await signRefreshToken(user._id);

          process.env.JWT_ACCESS_TOKEN = accessToken;
          process.env.JWT_REFRESH_TOKEN = refreshToken;

          return res.json({ trans: "success" });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ trans: "failed", error: error.message });
        });
    }
  } catch (error) {
    return res.status(500).json({ trans: "failed", error: error.message });
  }
});

module.exports = router;
