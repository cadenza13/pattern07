'use strict';

{
  const stock = [
    {image: "img/item01.jpeg", name: 'ハーバリウム', price: 700, quantity: 0},
    {image: "img/item02.jpeg", name: '目覚まし時計', price: 800, quantity: 0},
    {image: "img/item03.jpeg", name: 'ガラスのオブジェ', price: 900, quantity: 0},
    {image: "img/item04.jpeg", name: '小さな門松', price: 300, quantity: 0},
    {image: "img/item05.jpeg", name: '花嫁の置物', price: 450, quantity: 0},
    {image: "img/item06.jpeg", name: 'カエルの置物', price: 400, quantity: 0},
    {image: "img/item07.jpeg", name: 'ペンダントライト', price: 850, quantity: 0},
    {image: "img/item08.jpeg", name: '般若の面', price: 650, quantity: 0},
    {image: "img/item09.jpeg", name: '青いミニカー', price: 200, quantity: 0},
    {image: "img/item10.jpeg", name: '不思議な鳥かご', price: 750, quantity: 0},
    {image: "img/item11.jpeg", name: '菩薩像', price: 1200, quantity: 0},
    {image: "img/item12.jpeg", name: '懐中時計', price: 1000, quantity: 0},
  ];

  const clerk = document.getElementById('clerk');
  const itemCase = document.getElementById('itemCase');
  const clerkComment = document.getElementById('clerkComment');
  const mask = document.getElementById('mask');
  const buy = document.getElementById('buy');
  const advanceBtn = document.getElementById('advance');
  const returnBtn = document.getElementById('return');
  const image = document.getElementById('image');
  const name = document.getElementById('name');
  const price = document.getElementById('price');
  const quantity = document.getElementById('quantity');
  const up = document.getElementById('up');
  const down = document.getElementById('down');
  const cartDisplay = document.getElementById('cartDisplay');
  const cart = document.getElementById('cart');
  const cartBtn = document.getElementById('cartBtn');
  const cartReturnBtn = document.getElementById('cartReturnBtn');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const register = document.getElementById('register');
  const registerCart = document.getElementById('registerCart');
  const registerBtn = document.getElementById('registerBtn');
  const registerAdvanceBtn = document.getElementById('registerAdvanceBtn');
  const registerReturnBtn = document.getElementById('registerReturnBtn');
  const registerTotalPrice = document.getElementById('registerTotalPrice');
  
  let stockIndex = 0;
  let cartStockIndex = 0;
  let amount = 1;
  let cartHeight = cartDisplay.clientHeight;
  let total = 0;
  let loop = true;
  let cartStock = [];
  let cartElementStock = [];
  let deleteStock = [];

  for(let i = 0; i < stock.length; i++){
    const li = document.createElement('li');
    const img = document.createElement('img');
    const pName = document.createElement('p');
    const pPrice = document.createElement('p');
    const itemPrice = stock[i].price;

    img.src = stock[i].image;
    pName.textContent = stock[i].name;
    pPrice.textContent = `${itemPrice}円 (税込)`;

    li.appendChild(img);
    li.appendChild(pName);
    li.appendChild(pPrice);
    li.classList.add('item');

    itemCase.appendChild(li);
  }

  const items = document.querySelectorAll('.item');

  items.forEach((item, index) =>{
    item.addEventListener('click', () =>{
      const itemPrice = stock[index].price;
      mask.classList.remove('hidden');
      buy.classList.remove('hidden');
      image.src = stock[index].image;
      name.textContent = stock[index].name;
      price.textContent = `${itemPrice}円`;
      stockIndex = index;
    });
  });

  function totalAmount(){
    const currentQuantity = String(amount).padStart(2, '0');
    quantity.textContent = `x ${currentQuantity}`;
  }

  up.addEventListener('click', () =>{
    amount++;
    totalAmount();
  });

  down.addEventListener('click', () =>{
    if(amount <= 1) return;
    amount--;
    totalAmount();
  });

  advanceBtn.addEventListener('click', () =>{
    const searchElement = stock[stockIndex];
    if(cartStock.indexOf(searchElement) !== -1){
      const searchElementIndex = cartStock.indexOf(searchElement);
      const cartClass = document.querySelectorAll('.cart');
      const registerClass = document.querySelectorAll('.register');
      stock[stockIndex].quantity += amount;
      cart.removeChild(cartClass[searchElementIndex]);
      registerCart.removeChild(registerClass[searchElementIndex]);
      cartElementStock.splice(searchElementIndex, 1);
      cartStock.splice(searchElementIndex, 1);
      deleteStock.splice(searchElementIndex, 1);
    } else stock[stockIndex].quantity = amount;
   
    total += stock[stockIndex].price * amount;
    cartStock.push(stock[stockIndex]);
    cartStockIndex = cartStock.length - 1

    if(cartHeight >= 300){
      cart.classList.add('scroll');
    } else {
      cartHeight = 50 * cartStock.length;
      cartDisplay.style.height = cartHeight + 'px';
    }

    const li = document.createElement('li');
    const registerLi = document.createElement('li');
    const span = document.createElement('span');
    const img = document.createElement('img');
    const registerImg = document.createElement('img');
    const pName = document.createElement('p');
    const registerName = document.createElement('p');
    const pQuantity = document.createElement('p');
    const pDelete = document.createElement('p');
    const pTotal = document.createElement('p');
    const itemPrice = cartStock[cartStockIndex].price;
    const itemQuantity = cartStock[cartStockIndex].quantity;
    const itemTotal = itemPrice * itemQuantity;

    img.src = cartStock[cartStockIndex].image;
    registerImg.src = cartStock[cartStockIndex].image;
    pName.textContent = cartStock[cartStockIndex].name;
    registerName.textContent = cartStock[cartStockIndex].name;
    pQuantity.textContent = cartStock[cartStockIndex].quantity;
    pDelete.textContent = '削除';
    pTotal.textContent = `${itemPrice}円 x ${itemQuantity} = ${itemTotal}円`;
    
    li.appendChild(img);
    li.appendChild(pName);
    li.appendChild(pQuantity);
    li.appendChild(pDelete);
    li.classList.add('cart');
    pDelete.classList.add('deleteBtn');
    registerLi.appendChild(registerImg);
    span.appendChild(registerName);
    span.appendChild(pTotal);
    registerLi.appendChild(span);
    registerLi.classList.add('register');

    cartElementStock.push(li);
    deleteStock.push(pDelete);
    cart.appendChild(li);
    registerCart.appendChild(registerLi);

    clerkComment.textContent = 'いや～お客さん、お目が高い！';
    clerk.classList.remove('appear');
    mask.classList.add('hidden');
    buy.classList.add('hidden');
    amount = 1;
    totalAmount();
  });

  returnBtn.addEventListener('click', () =>{
    mask.classList.add('hidden');
    buy.classList.add('hidden');
    amount = 1;
    totalAmount();
  });
  
  cartBtn.addEventListener('click', () =>{
    mask.classList.remove('hidden');
    cartDisplay.classList.remove('hidden');
    cartTotalPrice.textContent = `合計金額 : ${total}円`;
    loop = true;
    deleteOn();
  });

  function deleteOn(){
    deleteStock.forEach((del, index) =>{
      del.addEventListener('click', () =>{
        if(!loop) return;
        
        const cartClass = document.querySelectorAll('.cart');
        const registerClass = document.querySelectorAll('.register');
        
        while(!cartClass[index]){
          index -= 1;
        }
        total -= cartStock[index].price * cartStock[index].quantity;
        cart.removeChild(cartClass[index]);
        registerCart.removeChild(registerClass[index]);
        cartElementStock.splice(index, 1);
        deleteStock.splice(index, 1);
        cartStock.splice(index, 1);

        loop = false;

        mask.classList.add('hidden');
        cartDisplay.classList.add('hidden');
        clerkComment.textContent = 'もどすんですか？ マジですか？';
      });
    });
  }

  cartReturnBtn.addEventListener('click', () =>{
    mask.classList.add('hidden');
    cartDisplay.classList.add('hidden');
  });

  registerBtn.addEventListener('click', () =>{
    if(cartStock.length < 1){
      clerk.classList.remove('appear');
      clerkComment.textContent = 'まだ何もカートに入ってませんよ？';
      return;
    }
    clerkComment.textContent = 'お会計ですね！？';
    mask.classList.remove('hidden');
    mask.classList.add('clear');
    register.classList.remove('hidden');
    registerTotalPrice.textContent = `合計金額 : ${total}円`;
  });

  registerAdvanceBtn.addEventListener('click', () =>{
    clerk.classList.add('appear');
    clerkComment.textContent = 'ありがとうございましたー！！';
    mask.classList.add('hidden');
    mask.classList.remove('clear');
    register.classList.add('hidden');

    const cartClass = document.querySelectorAll('.cart');
    const registerClass = document.querySelectorAll('.register');

    for(let i = 0; i < cartStock.length; i++){
      cart.removeChild(cartClass[i]);
      registerCart.removeChild(registerClass[i]);
    }

    total = 0;
    cartStock = [];
    cartElementStock = [];
    deleteStock = [];
  });

  registerReturnBtn.addEventListener('click', () =>{
    clerkComment.textContent = '冷やかしならとっとと帰んな！！';
    mask.classList.add('hidden');
    mask.classList.remove('clear');
    register.classList.add('hidden');
  });

  totalAmount();
}