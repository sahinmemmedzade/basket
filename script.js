document.addEventListener("DOMContentLoaded",function(params) {
    document.getElementById("go-to-checkout").addEventListener("click",()=>{
        window.location.href="./checkout.html"
    })
    const addToCartButton=document.querySelectorAll(".add-to-cart")

    const deleteAll=document.getElementById("delete-all")

    deleteAll.addEventListener("click",()=>{
        localStorage.removeItem("sebet")
        const cartItems=document.getElementById("cart-items")
        cartItems.innerText="Empty"
        document.getElementById("total-price").innerText="0"
        UpdateCartCount()
    })

    

    addToCartButton.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            const card=e.target.closest(".card")
            console.log(card);
            const product={
                id:card.dataset.id,
                image:card.querySelector("img").src,
                title:card.querySelector("h3").innerText,
                price:parseFloat(card.querySelector("p").innerText.replace('$','')),
                quantity:1
            }

            addToCart(product)
            DisplayCart()
            
        })
    })

    function addToCart(addproduct) {
        
        let cart=JSON.parse(localStorage.getItem("sebet")) || [] //eger localda cart varsa getir yoxdursa bos array dondur
        const existingProductIndex=cart.findIndex((product)=>product.id===addproduct.id)

        if(existingProductIndex > -1){
            cart[existingProductIndex].quantity+=1
        }
        else{
            cart.push(addproduct)
        }

        localStorage.setItem("sebet",JSON.stringify(cart))
        UpdateCartCount()
       
    }

    function DisplayCart() {
        
        let cart=JSON.parse(localStorage.getItem("sebet")) || []

        const cartItems=document.getElementById("cart-items")
        cartItems.innerHTML=''

        cart.forEach((product)=>{

           const pro=document.createElement("div")
           pro.innerHTML=`<div class="cartProduct" data-id=${product.id}><img class="cartImage" src=${product.image} alt="Mercedes"> ${product.title}-${product.quantity} eded -Price: ${(product.quantity*product.price).toFixed(2)} <i class="fa-solid fa-trash delete-product" ></i></div>`
            cartItems.appendChild(pro)
        })

        const totalPrice=cart.reduce((toplam,item)=>toplam+(item.price*item.quantity),0)
        document.getElementById("total-price").textContent=totalPrice.toFixed(2)


        const deleteProduct=document.querySelectorAll(".delete-product")

        deleteProduct.forEach(delPro=>{
        
            delPro.addEventListener("click",(e)=>{
                const card=e.target.closest(".cartProduct")
                console.log(card);
                const productId=card.dataset.id
                RemoveProduct(productId)
                
            })
        })
    }


    function RemoveProduct(productID) {
            const cart=JSON.parse(localStorage.getItem("sebet")) || []
            const updateCart=cart.filter(item=>item.id !==productID)

            localStorage.setItem("sebet",JSON.stringify(updateCart))
            UpdateCartCount()
            DisplayCart()


    }

    function UpdateCartCount() {
        
        const cart=JSON.parse(localStorage.getItem("sebet")) || []

        const totalCount=cart.reduce((toplam,item)=>toplam+item.quantity,0)

        document.getElementById("cart-count").innerText=totalCount
    }

    UpdateCartCount()
    DisplayCart()
})

document.addEventListener("DOMContentLoaded", function () {
    function addToWishlist(product) {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    function removeFromWishlist(productId) {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist = wishlist.filter((product) => product.id !== productId);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    function displayWishlist() {
        const wishlistItems = document.getElementById("wishlist-items");
        wishlistItems.innerHTML = "";
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist.forEach((product) => {
            const wishlistItem = document.createElement("div");
            wishlistItem.classList.add("wishlist-item");
            wishlistItem.setAttribute("data-id", product.id);
            wishlistItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="wishlist-details">
                    <h3>${product.title}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button class="remove-from-wishlist">Remove from Wishlist</button>
                    <button class="add-to-cart-wishlist">Add to Cart</button>
                </div>`;
            wishlistItems.appendChild(wishlistItem);
        });
    }

    function displayCart() {
        const cartItems = document.getElementById("cart-items");
        cartItems.innerHTML = ""; 
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist.forEach((product) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cartProduct");
            cartItem.setAttribute("data-id", product.id);
            cartItem.innerHTML = `
                <img class="cartImage" src="${product.image}" alt="${product.title}">
                ${product.title} - 1 eded - Price: ${product.price.toFixed(2)}
                <i class="fa-solid fa-trash delete-product"></i>`;
            cartItems.appendChild(cartItem);
        });
    }

    const addToWishlistButtons = document.querySelectorAll(".add-to-wishlist");
    addToWishlistButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            const product = {
                id: card.dataset.id,
                image: card.querySelector("img").src,
                title: card.querySelector("h3").innerText,
                price: parseFloat(card.querySelector("p").innerText.replace('$', '')),
            };
            addToWishlist(product);
            displayWishlist();
        });
    });

    document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("remove-from-wishlist")) {
            const productId = e.target.closest(".wishlist-item").dataset.id;
            removeFromWishlist(productId);
            displayWishlist();
        }
    });

    function addToCart(addproduct) {
        let cart = JSON.parse(localStorage.getItem("sebet")) || []; 
        const existingProductIndex = cart.findIndex((product) => product.id === addproduct.id);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push(addproduct);
        }

        localStorage.setItem("sebet", JSON.stringify(cart));
        UpdateCartCount();
    }

    function RemoveProduct(productID) {
        const cart = JSON.parse(localStorage.getItem("sebet")) || [];
        const updateCart = cart.filter((item) => item.id !== productID);

        localStorage.setItem("sebet", JSON.stringify(updateCart));
        UpdateCartCount();
        DisplayCart();
    }

    function UpdateCartCount() {
        const cart = JSON.parse(localStorage.getItem("sebet")) || [];

        const totalCount = cart.reduce((total, item) => total + item.quantity, 0);

        document.getElementById("cart-count").innerText = totalCount;
    }

    function DisplayCart() {
        let cart = JSON.parse(localStorage.getItem("sebet")) || [];

        const cartItems = document.getElementById("cart-items");
        cartItems.innerHTML = '';

        cart.forEach((product) => {
            const cartItem = document.createElement("div");
            cartItem.innerHTML = `
                <div class="cartProduct" data-id="${product.id}">
                    <img class="cartImage" src="${product.image}" alt="${product.title}">
                    ${product.title} - ${product.quantity} eded - Price: ${(product.quantity * product.price).toFixed(2)}
                    <i class="fa-solid fa-trash delete-product"></i>
                </div>`;
            cartItems.appendChild(cartItem);
        });

        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        document.getElementById("total-price").textContent = totalPrice.toFixed(2);

        const deleteProduct = document.querySelectorAll(".delete-product");

        deleteProduct.forEach(delPro => {

            delPro.addEventListener("click", (e) => {
                const card = e.target.closest(".cartProduct");
                const productId = card.dataset.id;
                RemoveProduct(productId);
            });
        });
    }

    document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("add-to-cart-wishlist")) {
            const productId = e.target.closest(".wishlist-item").dataset.id;
            const product = getProductById(productId); 
            addToCart(product);
            removeFromWishlist(productId);
            displayWishlist();
            displayCart(); 
        }
    });

    function getProductById(productId) {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        return products.find(product => product.id === productId);
    }

    UpdateCartCount();
    DisplayCart();
});
