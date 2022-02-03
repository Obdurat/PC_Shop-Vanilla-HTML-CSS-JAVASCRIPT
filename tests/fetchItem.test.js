require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  test('Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  test('Testa se fetch é chamada ao chamar fetchItem', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(url);
  });
  test('Verifica se o Objeto retornado por fetchItem está correto', async () => {    
    expect(await fetchItem('MLB1615760527')).toEqual(item);    
  });
  test('Test se ao chamar fetchItem sem argumentos retorna um erro', async () => {
    expect.assertions(1)
    try { 
      await fetchItem(); 
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
