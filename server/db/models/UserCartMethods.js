module.exports = (User, db) => {
  User.prototype.getCart = async function () {
    const where = {   //maybe change this const name
      userId: this.id,
      status: 'CART' //status of what?
    };
    const Order = db.models.order;      //should order line item and product be capitalized?
    const LineItem = db.models.lineItem;
    const Product = db.models.product;
    let cart = await Order.findOne({
      where 
    });
    if(!cart) {
      cart = await Order.create(where); 
    }
    return Order.findByPk(cart.id,
    { include: [
        { include: [
          { model: LineItem, include: [Product] }
        ]}]}
    );
  };
  
  User.prototype.removeFromCart = async function(product) {
    const cart = await this.getCart();
    const lineItem = cart.lineItems.find(lineItem => lineItem.productId === product.id);
    lineItem.quantity--;
    if (lineItem.quantity) {
      await lineItem.save();
    }
    else {
      await lineItem.destroy();
    }
    return this.getCart();
  }
  
  User.prototype.addToCart = async function(product) {
    const cart = await this.getCart();
    let lineItem = cart.lineItems.find(lineItem => lineItem.productId === product.id);
    if (lineItem) {
      lineItem.quantity++;
      await lineItem.save();
    }
    else {
      await db.models.lineItem.create({
        productId: product.id, orderId: cart.id
      });
    }
    return this.getCart();
  } 
    
    
}