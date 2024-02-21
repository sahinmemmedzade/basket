let cart = [];

const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const cartCount = document.getElementById('card-count');

if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    let uniqueItems = new Set(cart.map(item => item.id));
    let totalItems = cart.length;
    cartCount.textContent = `${uniqueItems.size} (${totalItems})`;

    cart.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <p class="cart-item-title">${item.title}</p>
                <p class="cart-item-price">$${item.price}</p>
            </div>
            <button class="delete-item" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
        `;
        cartItems.appendChild(div);
        total += item.price;
    });

    totalPrice.textContent = total.toFixed(2);

    const deleteButtons = document.querySelectorAll('.delete-item');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemId = button.dataset.id;
            removeFromCart(itemId);
        });
    });
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function addToCart(id, title, price, image) {
    const item = { id, title, price, image };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

const addToCartButtons = document.querySelectorAll('.card button');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const parentCard = button.closest('.card');
        const id = parentCard.dataset.id;
        const title = parentCard.querySelector('h3').textContent;
        const price = parseFloat(parentCard.querySelector('p').textContent.slice(1));
        const image = parentCard.querySelector('img').src;

        addToCart(id, title, price, image);
    });
});

const cartElement = document.querySelector('.cart');
cartElement.addEventListener('click', () => {
    const dropdownCart = document.getElementById('dropdown-cart');
    dropdownCart.style.display = dropdownCart.style.display === 'block' ? 'none' : 'block';
});

function deleteAllItems() {
    cart = []; 
    localStorage.removeItem('cart'); 
    updateCart(); 
    updateDropdownCart(); 
}

const deleteAllButton = document.getElementById('delete-all-button');
deleteAllButton.addEventListener('click', deleteAllItems);
