let cart = [];
let buttonsAddToCart = document.getElementsByClassName('add-to-card');
console.log(buttonsAddToCart.length);
for (let index = 0; index < buttonsAddToCart.length; index++ ) {
	buttonsAddToCart[index].addEventListener('click', addToCart);
}

function addToCart(event) {
	let count = document.getElementById('count');
	console.log(count);

	count.innerText ++;
	//{"id": 1, "name": "Lemon", "price": 7.6, "imgUrl": "./img/lemon.jpg"}
	let id = event.target.parentNode.id;
	let oneProduct = productsArr.find(item => Number(item.id) === Number(id));
	let newarr = productsArr;
	if (oneProduct === undefined) {
		alert('Not found');
	} else {
		let findProduct = cart.find(item => Number(item.product.id) === Number(id));
		if (!findProduct) {
		let product = {
		product: oneProduct,
		amount: 1
	}
	cart.push(product);
	} else {
		findProduct.amount ++;
	}
	console.log(cart);
	}
}

//-----clear cart-------
let clearCartButton = document.getElementById('clearCard');
clearCartButton.addEventListener('click', clearCart);
function clearCart(event) {
	cart = [];
	let count = document.getElementById ('count');
	 count.innerText = 0 ;
}

//---- show cart-----
let showCartButton = document.getElementById('show-card');
showCartButton.addEventListener('click',showCart);

function showCart(event) {
let strCart = '';
	 for (let i = 0; i < cart.length; i++) {
	 	strCart += '<article id="product_'+ cart[i].product.id + '"class="row">'+
                   '<p class="col">'+ cart[i].product.name + '</p>'+
                   '<p class="col">&#36;<span>'+cart[i].product.price.toFixed(2) + '</span></p>'+
                   '<input class="productAmount col form-control" type="number" min="1" max= "100" value="' + cart[i].amount+'"/>'+
                   '<p class="col">&#36;<span>'+ (Number(cart[i].product.price)*Number(cart[i].amount)).toFixed(2) +'</span></p>'+
               '</article>';
	 }
	 document.getElementById('cartBody').innerHTML= strCart;

	let productAmountInputs = document.getElementsByClassName('productAmount');
  	for (let i = 0; i < productAmountInputs.length; i++) {
 	productAmountInputs[i]. addEventListener('input',priceByProducts);
  }

	 totalPrice();
	}
	function totalPrice() {
 let sum = 0;
 	 for (let i =0;  i < cart.length; i++) {
 		 sum += cart[i].product.price*cart[i].amount; 
 	 }
 	 document.getElementById('cartTotal').innerText = sum.toFixed(2);
	}
	function priceByProducts(event) {
		let newAmount= event.target.value;
		// console.log(amount);
		let productId = event.target.parentNode.id;
		let id = productId.split('_')[1];
		let product = cart.find(item => Number(item.product.id) === Number(id));
		if (product) {
		product.amount = newAmount;
}
showCart();
	}
