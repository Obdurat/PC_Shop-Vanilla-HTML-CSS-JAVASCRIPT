const cart = document.querySelector('.cart__items');
const itemsSection = document.querySelector('.items');
const prices = document.querySelector('.total-price');
const clearCart = document.querySelector('.empty-cart');
const loading = document.querySelector('.loading');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function pricesSum(num) {
  let current;  
    const previous = prices.innerText === '' ? 0 : Number(prices.innerText, 10);     
    if (typeof num === 'number') { current = previous + num; }
    if (typeof num === 'string') { current = previous - Number(num, 10); }  
    prices.innerText = current;  
}

function cartItemClickListener({ target }) {
  // coloque seu código aqui
  const priceStart = target.innerText.indexOf('$') + 1;
  const price = target.innerText.slice(priceStart, target.innerText.length);
  pricesSum(price);
  target.remove();       
  saveCartItems(cart.innerHTML);
}

function createCartItemElement({ id, title, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  pricesSum(price);  
  return li;
}

async function addToCart({ target }) {
  const parent = target.parentNode;  
  if (target === parent.querySelector('button.item__add')) {
    const item = await fetchItem(getSkuFromProductItem(parent));    
    cart.appendChild(createCartItemElement(item));
    saveCartItems(cart.innerHTML);       
  }      
}

function createProductItemElement({ id, title, thumbnail, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('i', 'item__price', `R$ ${price.toFixed(2)}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));  
  section.addEventListener('click', addToCart);

  return section;
}

async function addToPage() {
  const data = await fetchProducts('computador');
  await data.results.forEach((product) => {
    itemsSection.appendChild(createProductItemElement(product));
  });
  clearCart.addEventListener('click', () => { 
    cart.innerHTML = ''; 
    prices.innerHTML = ''; 
  });
  loading.remove();         
}

function addEventToCartItemsAfterLoad(callback) {
  const items = [...cart.children];
  items.forEach((item) => item.addEventListener('click', callback));
}

window.onload = () => { 
  addToPage(); 
  getSavedCartItems(cart);
  addEventToCartItemsAfterLoad(cartItemClickListener);
 };