const saveCartItems = (str) => {
  // seu código aqui  
  localStorage.setItem('cartItems', str);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
