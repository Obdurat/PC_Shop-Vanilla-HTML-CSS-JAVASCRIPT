const getSavedCartItems = (element) => {
  // seu código aqui
  const cart = element;
  cart.innerHTML = localStorage.getItem('cartItems');  
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
