const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  test('Ao executar getSavedCartItems o método localStorage.getItem é chamado', () => {
    document.body.innerHTML = '<ol class="cart__items"></ol>';
    const cart = document.querySelector('.cart__items');
    getSavedCartItems(cart);
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  test('Ao executar getSavedCartItems, o método localStorage.getItem é chamado com cartItems como parâmetro.', () => {
    document.body.innerHTML = '<ol class="cart__items"></ol>';
    const cart = document.querySelector('.cart__items');
    getSavedCartItems(cart);
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');    
  }); 
});
