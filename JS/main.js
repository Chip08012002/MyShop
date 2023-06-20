//Cart
var cartIcon = document.querySelector('#cart-icon');
var cart = document.querySelector('.cart');
var closeCart = document.querySelector('#close-cart')

const products = {
    currentIndex: 0,
    config: {},
    items: [
      {
        img: 'img/product1.jpg',
        title: 'AEROREDY SHIRT',
        price: '$28.4',
      },
      {
        img: 'img/product2.jpg',
        title: 'WIRELESS EARBUDS',
        price: '37.5',
      },
      {
        img: 'img/product3.jpg',
        title: 'HOODED PARKA',
        price: '$24',
      },
      {
        img: 'img/product4.jpg',
        title: 'STAW METAL BOTTLE',
        price: '$14.98',
      },
      {
        img: 'img/product5.jpg',
        title: 'METAL SUNGLASSES',
        price: '$12.56',
      },
      {
        img: 'img/product6.jpg',
        title: 'BACK HAT',
        price: '$5.8',
      },
      {
        img: 'img/product7.jpg',
        title: 'BACKPACK',
        price: '$13.5',
      },
      {
        img: 'img/product8.jpg',
        title: 'ULTRABOOST 22',
        price: '$45.34',
      },
    ],
  };
  
  function renderProducts() {
    const shopContent = document.querySelector('.shop-content');
  
    for (let i = 0; i < products.items.length; i++) {
      const product = products.items[i];
  
      const productBox = document.createElement('div');
      productBox.classList.add('product-box');
  
      const img = document.createElement('img');
      img.src = product.img;
      img.alt = '';
      img.classList.add('product-img');
      productBox.appendChild(img);
  
      const title = document.createElement('h2');
      title.textContent = product.title;
      title.classList.add('product-title');
      productBox.appendChild(title);
  
      const price = document.createElement('span');
      price.textContent = product.price;
      price.classList.add('price');
      productBox.appendChild(price);
  
      const cartIcon = document.createElement('i');
      cartIcon.classList.add('bx', 'bx-shopping-bag', 'add-cart');
      productBox.appendChild(cartIcon);
  
      shopContent.appendChild(productBox);
    }
  }
  
  renderProducts();
   

cartIcon.onclick = () => {
    cart.classList.add('active');
};

closeCart.onclick = () => {
    cart.classList.remove('active');
}

// Cart Working JS

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

//Making Funcion
function ready() {
    //Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log (removeCartButtons)
    for(var i = 0; i<removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }
    //Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for(var i = 0; i<quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for(var i = 0; i<addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    };
    //Buy Button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}
// Buy Button
function buyButtonClicked() {
    alert('Your Order is placed');
    var cartContent =document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }   
    updateTotal();
}



//Remove Items From Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if(isNaN(input.value) || input.value <=1) {
        input.value = 1;
    }
    updateTotal();
}
// Add To Cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();

}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemNames = document.getElementsByClassName('cart-product-title');
    for(var i = 0; i<cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
        alert('You have already add this item  to cart');
        return;
    }
}
var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                          <!-- Remove Cart -->
                         <i class="bx bxs-trash-alt cart-remove"></i>`
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

}

// Update Total
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = document.getElementsByClassName('cart-box');
    var total = 0;
    for(var i = 0; i<cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value;
        total = total + price * quantity };
        //If price Contain some Cents Value
        total = Math.round(total *100) / 100;
    
    document.getElementsByClassName('total-price')[0].innerHTML = '$' + total;
}

// Breakpoints /Making Responsive */

