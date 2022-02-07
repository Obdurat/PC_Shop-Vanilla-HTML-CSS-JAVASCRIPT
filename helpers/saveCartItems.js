const saveCartItems = (cart, price) => {
  // seu código aqui  
  localStorage.setItem('cartItems', cart);
  localStorage.setItem('price', price);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
