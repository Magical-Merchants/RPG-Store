const router = require("express").Router();
const { models: { User }} = require("../db");

module.exports = router

//see user's cart
router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (err) {
    next(err);
  }
});

// router.post("/createOrder", async (req, res, next) => {
//   try {
//     const user = await User.findByToken(req.headers.authorization);
//     res.send(await User.createOrder());
//   } catch (err) {
//     next(err);
//   }
// })

router.post("/addToCart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/removeFromCart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body));
  } catch (err) {
    next(err);
  }
});