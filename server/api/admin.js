const router = require("express").Router();
const { User, Product, Category } = require("../db/models");
module.exports = router;

router.post("/add-product", async (req, res, next) => {
  try {
    const productCreated = await Product.create(req.body);
    res.status(201).send(productCreated);
  } catch (err) {
    next(err);
  }
});
