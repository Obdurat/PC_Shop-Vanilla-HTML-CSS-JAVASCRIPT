const cart = document.querySelector('.cart__items');
const itemsSection = document.querySelector('.items');
const prices = document.querySelector('.total-price');
const clearCart = document.querySelector('.empty-cart');
const loading = document.querySelector('.loading');
const cartIcon = document.querySelector('#cart-icon');
const cartContainer = document.querySelector('.cart');
const cartCounter = document.querySelector('.cart-counter');
const searchInput = document.querySelector('#search-input');

function cartCounting() {
  if (cart.children.length === 0) {
    cartCounter.style.display = 'none';
  } else {
    cartCounter.style.display = 'initial';
    cartCounter.innerText = cart.children.length;
  }
  cartCounter.style.animation = 'cart_counter 0.5s';
  setTimeout(() => {
    cartCounter.style.animation = '';
  }, 500);
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function cartPrice() {
  let output = 0;
  const allCart = [...cart.children];
  if (allCart.length === 0) { return 'Adicione Items ao seu Carrinho!'; }
  allCart.forEach((item) => {
    const itemPrice = item.querySelector('p.cart-item-price').innerText;
    output += Number(itemPrice.slice(4, itemPrice.length));
  });
  return `Total: R$ ${output.toFixed(2)}`;
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

function cartItemClickListener({ target }) {
  // coloque seu código aqui    
  const container = target.parentNode;
  container.parentNode.remove();
  prices.innerText = cartPrice();
  saveCartItems(cart.innerHTML, prices.innerHTML);
  cartCounting();    
}

function createCartItemElement({ id, title, price, thumbnail }) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  li.className = 'cart__item';
  div.className = 'cart-item-info';  
  li.appendChild(createProductImageElement(thumbnail));  
  div.appendChild(createCustomElement('p', 'cart-item-title', title));
  div.appendChild(createCustomElement('p', 'cart-item-price', `R$: ${price.toFixed(2)}`));
  div.appendChild(createCustomElement('button', 'cart-item-remove', 'Remover'));
  div.appendChild(createCustomElement('span', 'cart-item-id', id));
  li.appendChild(div);    
  li.querySelector('button.cart-item-remove').addEventListener('click', cartItemClickListener);    
  return li;
}

async function addToCart({ target }) {
  const parent = target.parentNode;  
  if (target === parent.querySelector('button.item__add')) {
    const item = await fetchItem(getSkuFromProductItem(parent));    
    cart.appendChild(createCartItemElement(item));           
  }
  prices.innerText = cartPrice();
  saveCartItems(cart.innerHTML, prices.innerHTML);
  cartCounting();      
}

function createProductItemElement({ id, title, thumbnail, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  const betterImg = `${thumbnail.slice(0, -5)}J.pgn`;  

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(betterImg));
  section.appendChild(createCustomElement('i', 'item__price', `R$ ${price.toFixed(2)}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));  
  section.addEventListener('click', addToCart);

  return section;
}

async function addToPage(query = 'computador') {
  itemsSection.innerHTML = '';
  const data = await fetchProducts(query);
  await data.results.forEach((product) => {
    itemsSection.appendChild(createProductItemElement(product));
  });
  clearCart.addEventListener('click', () => { 
    cart.innerHTML = ''; 
    prices.innerHTML = 'Adicione Items ao seu Carrinho!';
    cartCounting(); 
  });
  loading.remove();          
}

function addEventToCartItemsAfterLoad(callback) {
  const items = [...cart.children];
  items.forEach((item) => {
    item.querySelector('button.cart-item-remove').addEventListener('click', callback);
  });
}

const rotationAnimation = 'rotateX(0deg)';

cartIcon.addEventListener('click', () => {
  if (cartContainer.style.transform === rotationAnimation) {
    cartContainer.style.transform = 'rotateX(-90deg)';
  } else {
    cartContainer.style.transform = rotationAnimation;
  }  
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addToPage(searchInput.value === '' ? 'tudo' : searchInput.value);
});

window.onload = () => { 
  addToPage(); 
  getSavedCartItems(cart, prices);
  addEventToCartItemsAfterLoad(cartItemClickListener);
  cartCounting();
 };