const router = require("express").Router();
const {requireToken} = require('./gatekeepingMiddleware')

module.exports = router

router.post('/', async (req, res) => {
    const {order} = req.body
    const intent = stripe.paymentIntents.create({
      amount:
        order.lineItems.reduce(
          (accum, lineItem) => accum + lineItem.price * lineItem.quantity,
          0
        ) * 100,
      currency: 'usd',
      payment_method_types: ['card'],
    })
    res.send({clientSecret: intent.client_secret})
  })