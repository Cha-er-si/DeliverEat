const router = require("express").Router();
const User = require("../model/User");
const bcyrpt = require("bcrypt");

const {
  verifyAccessToken,
  signAccessToken,
  signRefreshToken,
} = require("../middlewares/auth-middleware");

const userExists = async (email) => {
  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (user) {
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

// Routes

router.get("/", verifyAccessToken, async (req, res) => {
  try {
    const user = await User.findById(req.payload.user_id).select("-password");
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ trans: "failed", error: error.message });
  }
});

router.post("/register", async (req, res) => {
  debugger;
  try {
    const { firstName, lastName, email, username, password } = req.body;

    if (await userExists(req.body.email)) {
      return res
        .status(409)
        .json({ trans: "invalid", error: "Email already exists." });
    } else {
      if (password == "" && password == null) {
        return res
          .status(500)
          .json({ trans: "invalid", error: "Password is required" });
      }

      await new User({
        firstName,
        lastName,
        email,
        username,
        password,
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

router.post("/login", async (req, res) => {
  try {
    await User.findOne({
      username: req.body.username,
    })
      .then(async (user) => {
        if (!user) {
          return res.status(401).json({ error: "User does not exist." });
        }

        await bcyrpt
          .compare(req.body.password, user.password)
          .then(async (isMatch) => {
            if (!isMatch)
              return res.status(401).json({ error: "Invalid credentials." });

            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);

            process.env.JWT_ACCESS_TOKEN = accessToken;
            process.env.JWT_REFRESH_TOKEN = refreshToken;

            return res.json({ trans: "success" });
          });
      })
      .catch((err) => {
        return res.status(500).json({ trans: "failed", error: err.message });
      });
  } catch (error) {
    return res.status(500).json({ trans: "failed", error: error.message });
  }
});

router.post("/change-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (await userExists(email)) {
      const user = await User.findOne({
        email: email.toLowerCase().trim(),
      });

      await bcyrpt.compare(oldPassword, user.password).then(async (isMatch) => {
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid credentials." });
        }

        Object.assign(user, { password: newPassword });

        user.save();

        return res.status(200).json({ trans: "success" });
      });
    } else {
      return res
        .status(401)
        .json({ trans: "failed", error: "User does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ trans: "failed", error: error.message });
  }
});

module.exports = router;
