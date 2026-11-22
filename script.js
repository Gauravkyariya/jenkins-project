
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        category: "Electronics",
        image: "https://placehold.co/300x200?text=Headphones"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1999,
        category: "Electronics",
        image: "https://placehold.co/300x200?text=Smart+Watch"
    },
    {
        id: 3,
        name: "Men's T-Shirt",
        price: 599,
        category: "Fashion",
        image: "https://placehold.co/300x200?text=T-Shirt"
    },
    {
        id: 4,
        name: "Running Shoes",
        price: 2499,
        category: "Fashion",
        image: "https://placehold.co/300x200?text=Shoes"
    },
    {
        id: 5,
        name: "Sunglasses",
        price: 799,
        category: "Accessories",
        image: "https://placehold.co/300x200?text=Sunglasses"
    },
    {
        id: 6,
        name: "Backpack",
        price: 1199,
        category: "Accessories",
        image: "https://placehold.co/300x200?text=Backpack"
    }
];

let cart = [];

function displayProducts(items) {
    const container = document.getElementById("product-list");

    container.innerHTML = items.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join("");
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

function updateCart() {
    const container = document.getElementById("cart-items");

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>
            <div>
                <button onclick="changeQuantity(${item.id}, -1)">−</button>
                ${item.quantity}
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join("");

    const count = cart.reduce((sum, item) =>
        sum + item.quantity, 0);

    const total = cart.reduce((sum, item) =>
        sum + item.price * item.quantity, 0);

    document.getElementById("cart-count").textContent = count;
    document.getElementById("total").textContent = total;
}

function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    updateCart();
}

function toggleCart() {
    document.getElementById("cart-panel")
        .classList.toggle("active");
}

function filterCategory(category) {
    const filtered = category === "All"
        ? products
        : products.filter(p => p.category === category);

    displayProducts(filtered);
}

document.getElementById("search").addEventListener("input", e => {
    const query = e.target.value.toLowerCase();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query)
    );

    displayProducts(filtered);
});

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order feature coming soon!");
}

displayProducts(products);
updateCart();
