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
    
  }
    
    
    
}