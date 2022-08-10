const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
//const express = require('express')
const router = require('express').Router()
// const app = express()
// app.use(express.static('public'))

const YOUR_DOMAIN = 'http://localhost:8080'



app.post('/create-checkout-session', async (req, res) => {
  const order = await Order.findById(req.body.orderId, {
    include: {model: LineItem},
  })
  const paymentIntent = await stripe.paymentIntents.create({
    amount:
      order.lineItems.reduce(
        (accum, lineItem) => accum + lineItem.price * lineItem.quantity,
        0
      ) * 100,
    currency: 'usd',
    payment_method_types: ['card'],
    // line_items: order.lineItems.map((lineItem) => {
    //   return {
    //     price_data: {
    //       currency: 'usd',
    //       product_data: {
    //         name: lineItem.name,
    //       },
    //       unit_amount: lineItem.priceInCents,
    //     },
    //     quantity: lineItem.quantity,
    //   }
    // }),
    // line_items: [
    //   {
    //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    //     price: '{{PRICE_ID}}',
    //     quantity: 1,
    //   },
    // ],
    // payment_method_types: ['card'],
    // mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  })
  res.send({
    clientSecret: paymentIntent.client_secret,
  })
})

//   app.listen(8080, () => console.log('Running on port 8080'));
