let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function addProduct() {
    let name = document.getElementById("productName").value;
    let price = parseFloat(document.getElementById("productPrice").value);
    if (name && price) {
        products.push({ name, price });
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
    }
}

function displayProducts() {
    let productTable = document.getElementById("productTable");
    productTable.innerHTML = "";
    products.forEach((product, index) => {
        productTable.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button onclick="deleteProduct(${index})">Delete</button>
                    <button onclick="addToCart(${index})">Add to Cart</button>
                </td>
            </tr>
        `;
    });
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

function addToCart(index) {
    let product = products[index];
    let existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity++;
        existing.total = existing.quantity * existing.price;
    } else {
        cart.push({ ...product, quantity: 1, total: product.price });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    let cartTable = document.getElementById("cartTable");
    let totalPrice = document.getElementById("totalPrice");
    cartTable.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.total;
        cartTable.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${item.total.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
    });
    totalPrice.innerText = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function placeOrder() {
    let customerName = document.getElementById("orderName").value;
    if (customerName && cart.length > 0) {
        orders.push({ customerName, cart, totalPrice: document.getElementById("totalPrice").innerText });
        localStorage.setItem("orders", JSON.stringify(orders));
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        displayOrders();
    }
}

function displayOrders() {
    let ordersTable = document.getElementById("ordersTable");
    ordersTable.innerHTML = "";
    orders.forEach(order => {
        ordersTable.innerHTML += `<tr><td>${order.customerName}</td><td>${order.cart.map(item => item.name).join(", ")}</td><td>$${order.totalPrice}</td></tr>`;
    });
}

displayProducts();
displayCart();
displayOrders();