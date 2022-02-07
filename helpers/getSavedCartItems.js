const getSavedCartItems = (carts, prices) => {
  // seu código aqui
  const cart = carts;
  const price = prices;
  cart.innerHTML = localStorage.getItem('cartItems');
  price.innerHTML = localStorage.getItem('price');  
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
