require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  signAccessToken: (user) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          user_id: user,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "15s" },
        (err, token) => {
          if (err) return reject({ error: err.message });
          return resolve(token);
        }
      );
    });
  },
  verifyAccessToken: (req, res, next) => {
    req.headers["authorization"] = "Bearer " + process.env.JWT_ACCESS_TOKEN;

    if (!req.headers["authorization"]) {
      return next(res.json({ error: "Unauthorized." }));
    }

    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, payload) => {
      if (err) {
        const message =
          err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
        if (err.name == "JsonWebTokenError") {
          return res.json({ trans: "failed", error: message });
        } else {
          return res.json({ trans: "expired", error: message });
        }
      }

      req.payload = payload;
      next();
    });
  },
  signRefreshToken: (user) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          user_id: user,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: "1y" },
        (err, token) => {
          if (err) return reject({ error: err.message });
          return resolve(token);
        }
      );
    });
  },
  verifyRefreshToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.REFRESH_TOKEN, (err, payload) => {
        if (err) {
          return reject({ error: err.message });
        }

        const userId = payload.user_id;
        resolve(userId);
      });
    });
  },
};
