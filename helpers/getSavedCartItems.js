const getSavedCartItems = (element, callback) => {
  // seu código aqui
  const cart = element;
  cart.innerHTML = localStorage.getItem('cartItems');
  const items = [...cart.children];
  items.forEach((item) => item.addEventListener('click', callback));
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
