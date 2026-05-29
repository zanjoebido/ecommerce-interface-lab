/* LABORATORY 6 */

class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

const products = [
    new Product(1, "Premium Leather Jacket", 149.99, "jacket.png"),
    new Product(2, "Wireless Headphones", 89.50, "headphones.png"),
    new Product(3, "Smart Sports Watch", 199.99, "watch.png"),
    new Product(4, "Ergonomic Blender", 45.00, "blender.png"),
    new Product(5, "Digital Rice Cooker", 65.25, "ricecooker.png"),
    new Product(6, "Watermelon Safe Container", 12.99, "watermelon.png"),
    new Product(7, "Classic Basketball", 29.99, "basketball.png"),
    new Product(8, "Organic Baby Oil", 8.50, "baby-oil.png"),
    new Product(9, "Sublime Audio Pods", 74.99, "pot.png"),
    new Product(10, "Minimalist Dress", 55.00, "dress.png")
];

let cart = JSON.parse(localStorage.getItem('ecommerce_cart')) || [];

function saveCartState() {
    localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
}

function renderProductGrid() {
    const gridContainer = document.querySelector('.product-grid');
    if (!gridContainer) return; 

    gridContainer.innerHTML = ""; 

    products.forEach(product => {

        const cardArticle = document.createElement('article');
        cardArticle.classList.add('product-card');

        const productImage = document.createElement('img');
        productImage.setAttribute('src', product.image);
        productImage.setAttribute('alt', product.name);

        const productTitle = document.createElement('h3');
        const titleText = document.createTextNode(product.name); 
        productTitle.appendChild(titleText);

        const productPrice = document.createElement('p');
        productPrice.classList.add('price-tag');
        const priceText = document.createTextNode(`₱${product.price.toFixed(2)}`);
        productPrice.appendChild(priceText);

        const orderButton = document.createElement('button');
        orderButton.classList.add('add-to-cart-btn');
        orderButton.textContent = "Add to Cart";
        orderButton.setAttribute('data-id', product.id);

        cardArticle.appendChild(productImage);
        cardArticle.appendChild(productTitle);
        cardArticle.appendChild(productPrice);
        cardArticle.appendChild(orderButton);

        gridContainer.appendChild(cardArticle);
    });

    gridContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const targetId = parseInt(event.target.getAttribute('data-id'), 10);
            const foundProduct = products.find(p => p.id === targetId);

            if (foundProduct) {

                const existingItem = cart.find(item => item.product.id === targetId);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ product: foundProduct, quantity: 1 });
                }
                
                saveCartState();

                const parentCard = event.target.closest('.product-card');
                if (parentCard) {
                    parentCard.classList.add('fade-in');
                    setTimeout(() => {
                        parentCard.classList.remove('fade-in');
                    }, 600);
                }
                
                alert(`${foundProduct.name} successfully appended to shopping cart basket total!`);
            }
        }
    });
}

function renderCartSystem() {
    const cartListElement = document.getElementById('cart-list');
    const totalDisplayElement = document.getElementById('cart-total');
    if (!cartListElement || !totalDisplayElement) return; 

    cartListElement.innerHTML = "";

    if (cart.length === 0) {
        cartListElement.innerHTML = "<li>Your checkout cart selection basket profile is currently empty.</li>";
        totalDisplayElement.textContent = "0.00";
        return;
    }

    cart.forEach((item, index) => {
        const itemRowLi = document.createElement('li');
        itemRowLi.classList.add('cart-item');

        const descriptiveInfoSpan = document.createElement('span');
        descriptiveInfoSpan.textContent = `${item.product.name} - ₱${item.product.price.toFixed(2)} x `;

        const quantityInputField = document.createElement('input');
        quantityInputField.setAttribute('type', 'number');
        quantityInputField.setAttribute('min', '0');
        quantityInputField.value = item.quantity;
        quantityInputField.classList.add('cart-qty-input');
        quantityInputField.setAttribute('data-index', index);

        itemRowLi.appendChild(descriptiveInfoSpan);
        itemRowLi.appendChild(quantityInputField);
        cartListElement.appendChild(itemRowLi);
    });

    const grossPriceTotal = cart.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.product.price * currentItem.quantity);
    }, 0);

    totalDisplayElement.textContent = grossPriceTotal.toFixed(2);
}

document.addEventListener('change', (event) => {
    if (event.target.classList.contains('cart-qty-input')) {
        const structuralIndex = parseInt(event.target.getAttribute('data-index'), 10);
        const freshUpdatedValue = parseInt(event.target.value, 10);

        if (freshUpdatedValue <= 0 || isNaN(freshUpdatedValue)) {

            cart.splice(structuralIndex, 1);
        } else {
            cart[structuralIndex].quantity = freshUpdatedValue;
        }

        saveCartState();
        renderCartSystem();
    }
});

function renderCheckoutSummary() {
    const subtotalElement = document.getElementById('checkout-subtotal');
    const totalElement = document.getElementById('checkout-total');
    if (!subtotalElement || !totalElement) return; 

    const grossPriceTotal = cart.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.product.price * currentItem.quantity);
    }, 0);

    const flatShippingFee = grossPriceTotal > 0 ? 100.00 : 0.00;
    const finalInvoiceTotal = grossPriceTotal + flatShippingFee;

    subtotalElement.textContent = grossPriceTotal.toFixed(2);
    
    const shippingDisplay = document.getElementById('checkout-shipping');
    if (shippingDisplay) {
        shippingDisplay.textContent = flatShippingFee.toFixed(2);
    }

    totalElement.textContent = finalInvoiceTotal.toFixed(2);
}

function initializeFormValidation() {
    const checkoutForm = document.querySelector('.checkout-form');
    const signupForm = document.querySelector('.signup-form');
   
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            
            let formIsValid = true;
            const nameInput = document.getElementById('signup-name');
            const emailInput = document.getElementById('signup-email');
            
            [nameInput, emailInput].forEach(input => {
                if (!input) return;
                input.classList.remove('error');
                const existingMsg = input.parentElement.querySelector('.error-message');
                if (existingMsg) existingMsg.remove();
            });

            if (nameInput && nameInput.value.trim() === "") {
                formIsValid = false;
                nameInput.classList.add('error');
                const errorSpan = document.createElement('span');
                errorSpan.classList.add('error-message');
                errorSpan.textContent = "Please enter your name.";
                nameInput.parentElement.appendChild(errorSpan);
            }

            if (emailInput && emailInput.value.trim() === "") {
                formIsValid = false;
                emailInput.classList.add('error');
                const errorSpan = document.createElement('span');
                errorSpan.classList.add('error-message');
                errorSpan.textContent = "Please enter a valid email address.";
                emailInput.parentElement.appendChild(errorSpan);
            }

            if (formIsValid) {
                localStorage.setItem('registered_user_name', nameInput.value.trim());
                localStorage.setItem('registered_user_email', emailInput.value.trim());
                alert("Account created successfully! Redirecting to your products page...");
                window.location.href = 'landing.html'; 
            }
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            
            let formIsValid = true;
            const textInputs = checkoutForm.querySelectorAll('input[type="text"]');

            textInputs.forEach(input => {
                input.classList.remove('error');
                const existingMsg = input.parentElement.querySelector('.error-message');
                if (existingMsg) existingMsg.remove();

                if (input.value.trim() === "") {
                    formIsValid = false;
                    input.classList.add('error');
                    const errorSpan = document.createElement('span');
                    errorSpan.classList.add('error-message');
                    errorSpan.textContent = "This field cannot be blank.";
                    input.parentElement.appendChild(errorSpan);
                }
            });

            if (formIsValid) {
 
                const shippingName = document.getElementById('fullname').value.trim();
                const shippingAddress = document.getElementById('address').value.trim();
                const shippingZip = document.getElementById('zip').value.trim();
                
                const checkedPaymentMethod = checkoutForm.querySelector('input[name="payment"]:checked');
                const selectedPayment = checkedPaymentMethod ? checkedPaymentMethod.value : "Not Specified";

                localStorage.setItem('last_order_name', shippingName);
                localStorage.setItem('last_order_address', shippingAddress);
                localStorage.setItem('last_order_zip', shippingZip);
                localStorage.setItem('last_order_payment', selectedPayment);

                console.log("Checkout address telemetry tracked successfully.");
           
                cart = []; 
                saveCartState();
              
                alert("Order verified and placed successfully! Thank you for your purchase.");
                window.location.href = 'landing.html';
            }
        });
    }
}

const persistentName = localStorage.getItem('registered_user_name');

const currentUser = {
    name: persistentName,
    orderHistory: [
        { trackingId: "ORD-99231", date: "2026-03-14", total: 239.49, items: "Premium Leather Jacket x1, Ergonomic Blender x2" },
        { trackingId: "ORD-88120", date: "2026-04-02", total: 89.50, items: "Wireless Headphones x1" }
    ]
};

function renderUserAccountMetrics() {
    const accountGreetingHeader = document.getElementById('account-greeting');
    if (accountGreetingHeader) {
        accountGreetingHeader.textContent = `Welcome back to your dashboard portal workspace, ${currentUser.name}!`;
    }

    const expandingHistoryContainer = document.getElementById('order-history-box');
    if (!expandingHistoryContainer) return;

    expandingHistoryContainer.innerHTML = "";

    currentUser.orderHistory.forEach(order => {
        const detailsWrapper = document.createElement('details');
        const summaryLabel = document.createElement('summary');
        
        summaryLabel.textContent = `Order Token: ${order.trackingId} (Placed on: ${order.date})`;
        detailsWrapper.appendChild(summaryLabel);

        summaryLabel.addEventListener('click', () => {
            const informationBlockSection = document.createElement('div');
            informationBlockSection.classList.add('order-extended-details');
            
            informationBlockSection.innerHTML = `
                <p style="margin: 0.5rem 0;"><strong>Unified Total Charged Asset:</strong> ₱${order.total.toFixed(2)}</p>
                <p style="margin: 0.5rem 0;"><strong>Purchased Item Parameters:</strong> ${order.items}</p>
            `;
            
            const duplicateCheck = detailsWrapper.querySelector('.order-extended-details');
            if (!duplicateCheck) {
                detailsWrapper.appendChild(informationBlockSection);
            }
        });

        expandingHistoryContainer.appendChild(detailsWrapper);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProductGrid();
    renderCartSystem();
    renderCheckoutSummary();
    initializeFormValidation();
    renderUserAccountMetrics();
});