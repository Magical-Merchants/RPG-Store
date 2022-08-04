'use strict'

const {
  db,
  models: {User, Category, Product},
} = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({force: true}) // clears db and matches models to tables
  console.log('db synced!')

  const categories = await Promise.all([Category.create({name: 'All'})])

  // Creating Users
  const users = await Promise.all([
    User.create({
      password: 'admin_password',
      firstName: `admin`,
      lastName: `admin`,
      email: `admin@magicalmerchants.com`,
      username: `admin`,
      isAdmin: true,
    }),

    User.create({
      password: '12345678',
      firstName: `CustomerFirst`,
      lastName: `CustomerLast`,
      email: `customer@gmail.com`,
      username: `test_customer`,
      isAdmin: false,
    }),
  ])
  const products = await Promise.all([
    Product.create({
      title: 'magical water',
      description: 'srgsyfhushfusehf',
      inventoryQty: 2,
      photoUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSqO81cvAxhv6ITnabxN8jw-pZ1HgLfR1fnQ&usqp=CAU',
      price: 4.99,
    }),
    Product.create({
      title: 'magical powder',
      description: 'dfdsjfg',
      inventoryQty: 6,
      photoUrl:
        'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/5/58/ALttP_Magic_Powder_Artwork.png/revision/latest/scale-to-width-down/320?cb=20170102023729',
      price: 8.99,
    }),
    Product.create({
      title: 'magical spray',
      description: 'sdfhguisfghius',
      inventoryQty: 3,
      photoUrl:
        'https://media.istockphoto.com/vectors/bottle-with-magic-potion-vector-id1248164289',
      price: 1.99,
    }),
    Product.create({
      title: 'magical wand',
      description: 'sgssg',
      inventoryQty: 9,
      photoUrl:
        'https://assetstorev1-prd-cdn.unity3d.com/key-image/528995c1-980e-4ad4-9f2c-4e6a39966621.jpg',
      price: 11.99,
    }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
