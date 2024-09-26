const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcyrpt = require("bcrypt");

let User = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    shopName: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "Email already exists."],
      required: true,
    },
    username: {
      type: String,
      unique: [true, "Username already exists."],
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    collection: "users",
  }
);

User.pre("save", async function (next) {
  let salt = await bcyrpt.genSalt(11);
  let passwordHashed = await bcyrpt.hash(this.password, salt);
  this.password = passwordHashed;
  next();
});

module.exports = mongoose.model("User", User);
