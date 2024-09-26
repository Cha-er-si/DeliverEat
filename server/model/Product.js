const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Product = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    products: [
      new Schema(
        {
          id: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
        },
        {
          _id: false,
        }
      ),
    ],
  },
  {
    collection: "products",
  }
);

// Product.pre("save", async function (next) {
//   let salt = await bcyrpt.genSalt(11);
//   let passwordHashed = await bcyrpt.hash(this.password, salt);
//   this.password = passwordHashed;
//   next();
// });

module.exports = mongoose.model("Product", Product);
