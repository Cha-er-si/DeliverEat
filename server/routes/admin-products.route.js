const router = require("express").Router();
const Product = require("../model/Product");
const User = require("../model/User");

router.post("/:username/products", async (req, res) => {
  try {
    const { username } = req.params;
    const newProduct = req.body;

    // Find user by username
    let product = await Product.findOne({ username });
    let user = await User.findOne({ username });

    if (user.role === "user") {
      res.status(400).send(error);
      return;
    }

    if (product) {
      // If user exists, append the new product to the products array
      const existingProductIndex = product.products.findIndex(
        (product) => product.id === newProduct.id
      );

      if (existingProductIndex > -1) {
        product.products[existingProductIndex] = newProduct;
      } else {
        product.products.push(newProduct);
      }
    } else {
      // If user does not exist, create a new user with the new product
      product = new Product({
        username,
        products: [newProduct],
      });
    }

    console.log({ product, user, newProduct });
    // Save the user document
    await product.save();

    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
