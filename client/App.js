import React from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'


const App = () => {
  const stripePromise = loadStripe(process.env.STRIPE_PRIVATE_KEY)
  return (
    <div>
      <Navbar />
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <Routes />
        </Elements>
      )}
    </div>
  )
}

export default App
