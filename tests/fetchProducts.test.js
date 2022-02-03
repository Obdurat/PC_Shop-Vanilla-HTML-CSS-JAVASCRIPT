require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  test('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test('Testa se ao chamar fetchProducts com o argumento computador fetch é chamada com a url correta', async() => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  test('Testa se o retorno de fetchProducts está correto', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  test('Testa se ao chamar o fetchProducts sem argumento retorna um erro', async () => {
    expect.assertions(1)
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    };
  });
});
