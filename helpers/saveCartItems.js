const saveCartItems = (cart, price) => {
  localStorage.setItem('cartItems', cart);
  localStorage.setItem('price', price);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
