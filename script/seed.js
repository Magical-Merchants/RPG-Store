'use strict'

const {
  db,
  models: {User, Category, Product, Order, LineItem},
} = require('../server/db')
const LoremIpsum = require('lorem-ipsum').LoremIpsum

//using an api to generate descriptions
const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

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
      firstName: `Trustworthy`,
      lastName: `Administrator`,
      email: `admin@magicalmerchants.com`,
      username: `admin`,
      isAdmin: true,
    }),

    User.create({
      password: 'whereTheWindTakesMe',
      firstName: `Wayward`,
      lastName: `Traveller`,
      email: `wayward_traveller@gmail.com`,
      username: `wayward_traveller`,
      isAdmin: false,
    }),

    User.create({
      password: 'lovelace22',
      firstName: `Ada`,
      lastName: `Love`,
      email: `ada_love@gmail.com`,
      username: `ada_love`,
      isAdmin: false,
    }),
  ])

  //Creating Products
  const products = await Promise.all([
    Product.create({
      title: 'magical water',
      description: lorem.generateSentences(10),
      inventoryQty: 0,
      photoUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSqO81cvAxhv6ITnabxN8jw-pZ1HgLfR1fnQ&usqp=CAU',
      price: 4.99,
      category: 'potions',
    }),
    Product.create({
      title: 'magical hat',
      description: lorem.generateSentences(10),
      inventoryQty: 6,
      photoUrl:
        'https://media.istockphoto.com/vectors/cartoon-halloween-witch-hat-vector-id596779036?k=20&m=596779036&s=170667a&w=0&h=GdP6f3toDP4cDNXibP9witygWXzQycv8H4qMWrWcFPc=',
      price: 8.99,
      category: 'fashion',
    }),
    Product.create({
      title: 'magical sword',
      description: lorem.generateSentences(10),
      inventoryQty: 3,
      photoUrl:
        'https://paizo.com/image/content/PathfinderTales/PZO8500-Hyrm.jpg',
      price: 1.99,
      category: 'weapons',
    }),
    Product.create({
      title: 'crystal wand',
      description:
        'A beautiful wand, perfect for casting powerful spells like "Lorem ipsum dolor sit amet."',
      inventoryQty: 9,
      photoUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2019/03/Crystal-Wand-580x386.jpg',
      price: 11.99,
      category: 'weapons',
    }),
    Product.create({
      title: 'pinkifying potion',
      description: 'Drinking this potion will turn you pink for 15 minutes.',
      inventoryQty: 9,
      photoUrl:
        'https://media.istockphoto.com/vectors/chemistry-glass-tube-filled-with-a-pink-liquid-potion-love-potion-vector-id664592192?s=612x612',
      price: 11.99,
      category: 'potions',
    }),
    Product.create({
      title: 'purple elixir',
      description: 'It tastes purple.',
      inventoryQty: 9,
      photoUrl:
        'https://image.shutterstock.com/image-illustration/bottle-recovery-purple-potion-great-260nw-436860214.jpg',
      price: 11.99,
      category: 'potions',
    }),
    Product.create({
      title: 'storm potion',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        'https://cdna.artstation.com/p/assets/images/images/015/035/966/large/garry-lewis-bottle-pract.jpg?1546810861',
      price: 11.99,
      category: 'potions',
    }),
    Product.create({
      title: 'Extra-pink potion',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        'https://media.istockphoto.com/vectors/chemistry-glass-bottle-filled-with-a-pink-liquid-potion-love-potion-vector-id664592044?k=20&m=664592044&s=170667a&w=0&h=7UcWS7LdQPf7tXuEyyyesaRH0tAdhVfe-4KPDfpHMDo=',
      price: 11.99,
      category: 'potions',
    }),
    Product.create({
      title: 'magic crystal',
      description: lorem.generateSentences(10),
      inventoryQty: 0,
      photoUrl:
        'https://art.ngfiles.com/images/1832000/1832704_monkeyonsticks_magical-rocks.png?f1621528535',
      price: 11.99,
      category: 'crystals',
    }),
    Product.create({
      title: 'love potion',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        'https://i.pinimg.com/originals/f2/8e/47/f28e478abdffa50e9969e9aea28507e7.jpg',
      price: 11.99,
      category: 'potions',
    }),
    Product.create({
      title: 'moon wand',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        'https://w7.pngwing.com/pngs/268/835/png-transparent-sailormoon-s-wand-illustration-sailor-moon-wand-drawing-anime-sailor-moon-cartoon-pretty-guardian-sailor-moon-moon.png',
      price: 11.99,
      category: 'weapons',
    }),
    Product.create({
      title: 'magic astronomy book',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        'https://cdn.tutsplus.com/cdn-cgi/image/width=500/vector/uploads/legacy/tuts/000-2011/411-magic-book/final.jpg',
      price: 11.99,
      category: 'books',
    }),
    Product.create({
      title: 'health potion',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        'https://media.istockphoto.com/vectors/bottle-with-red-potion-game-icon-of-magic-elixir-bright-design-for-vector-id1133997612?k=20&m=1133997612&s=170667a&w=0&h=M2Vv07fVEjEofWuF7Qm52AHYqv0rK-kWLBv2D9yHIEU=',
      price: 11.99,
      category: 'potions',
    }),
    Product.create({
      title: 'rainbow crystal',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        'https://cdna.artstation.com/p/assets/images/images/027/194/228/large/kara-woods-crystal-final.jpg?1590853298',
      price: 11.99,
      category: 'crystals',
    }),
    Product.create({
      title: 'magic book',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        'https://imgc.allpostersimages.com/img/posters/image-of-opened-magic-book-with-magic-lights_u-L-Q103IRV0.jpg?artHeight=550&artPerspective=n&artWidth=550&background=ffffff',
      price: 11.99,
      category: 'books',
    }),
    Product.create({
      title: 'magic book II',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        'https://www.thechildrensbookreview.com/wp-content/uploads/2010/11/Magic-Book-Featured-Image.jpg',
      price: 11.99,
      category: 'books',
    }),
    Product.create({
      title: 'magic book III',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        'https://i.pinimg.com/originals/e9/9a/65/e99a65a13ac84efe80e32907ee3265c1.jpg',
      price: 11.99,
      category: 'books',
    }),
    Product.create({
      title: 'book of magic pigs',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        'https://images.fineartamerica.com/images-medium-large-5/magic-book-floriana-barbu.jpg',
      price: 11.99,
      category: 'books',
    }),
    Product.create({
      title: 'book of ice magic',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        'https://imgc.allpostersimages.com/img/posters/image-of-opened-magic-book-with-magic-lights_u-L-Q103IY20.jpg?artHeight=550&artPerspective=n&artWidth=550&background=ffffff',
      price: 11.99,
      category: 'books',
    }),
    Product.create({
      title: 'phoenix ring',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        'https://i.pinimg.com/originals/ad/15/c7/ad15c76b537d4c6f180f27e14249ae2f.jpg',
      price: 11.99,
      category: 'fashion',
    }),
    Product.create({
      title: 'amethyst ring',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        'https://cdna.artstation.com/p/assets/images/images/012/694/310/large/nastya-avdonina-ay1mjolqn74.jpg?1536060682&dl=1',
      price: 11.99,
      category: 'fashion',
    }),
    Product.create({
      title: 'magic staff',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl: 'https://cdn.fireemblemwiki.org/c/c6/FEWATH_Magic_Staff.png',
      price: 11.99,
      category: 'weapons',
    }),
  ])

  const orders = await Promise.all([
    Order.create({
      userId: 1,
    }),
  ])

  const lineItems = await Promise.all([
    LineItem.create({
      orderId: 1,
      price: 4.99, //what happens if the price is more than 2 decimal places?
      quantity: 1,
      productId: 1,
    }),
    LineItem.create({
      orderId: 1,
      price: 11.99,
      quantity: 2,
      productId: 4,
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
