// DOM Elements
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceElement = document.querySelector('.total-price');
const modal = document.getElementById('product-modal');
const closeModal = document.querySelector('.close-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');
const addToCartBtn = document.querySelector('.add-to-cart');
const quantityInput = document.querySelector('.quantity-input');
const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const searchBox = document.querySelector('.search-box input');

// Sample product data
// Sample product data with internet image links
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        price: 99.99,
        description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        title: "Smart Watch",
        price: 199.99,
        description: "Feature-packed smartwatch with fitness tracking and smartphone notifications.",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        title: "Cotton T-Shirt",
        price: 24.99,
        description: "Comfortable 100% cotton t-shirt available in multiple colors.",
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        title: "Denim Jeans",
        price: 59.99,
        description: "Classic fit denim jeans with stretch for all-day comfort.",
        category: "clothing",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8amVhbnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 5,
        title: "Ceramic Coffee Mug",
        price: 14.99,
        description: "Handcrafted ceramic mug with ergonomic handle.",
        category: "home",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGC7JuKS7nE-OCQf68F94_qTzJ0zMxbGvyRuiZZ24Pf8yR80PElHG4dRDfaXwC-3pWY4TBG-8DYazyMwx2YcJUOh-LzK7zz7dTrYzLOOQq_D8YB6v4wEXP"
    },
    {
        id: 6,
        title: "Throw Blanket",
        price: 39.99,
        description: "Soft and cozy throw blanket perfect for your living room.",
        category: "home",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxhbmtldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 7,
        title: "Bluetooth Speaker",
        price: 79.99,
        description: "Portable Bluetooth speaker with 20W output and waterproof design.",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 8,
        title: "Running Shoes",
        price: 89.99,
        description: "Lightweight running shoes with cushioned soles for maximum comfort.",
        category: "clothing",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    }
];

// Update hero image with internet link
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1350&q=80')`;
    }
});

// Rest of your existing JavaScript code remains the same...

// State
let cart = [];
let currentProduct = null;

// Initialize the app
function init() {
    renderProducts(products);
    setupEventListeners();
    updateCartCount();
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCartItems();
    }
}

// Render products to the grid
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.category = product.category;
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <span class="product-category">${product.category}</span>
                <a href="#" class="view-details" data-id="${product.id}">View Details</a>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to view details buttons
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(btn.dataset.id);
            showProductDetails(productId);
        });
    });
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        renderProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => product.category === category);
    renderProducts(filteredProducts);
}

// Show product details in modal
function showProductDetails(productId) {
    currentProduct = products.find(product => product.id === productId);
    
    if (currentProduct) {
        modalImg.src = currentProduct.image;
        modalImg.alt = currentProduct.title;
        modalTitle.textContent = currentProduct.title;
        modalPrice.textContent = `$${currentProduct.price.toFixed(2)}`;
        modalDesc.textContent = currentProduct.description;
        quantityInput.value = 1;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeProductModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentProduct = null;
}

// Add to cart
function addToCart() {
    if (!currentProduct) return;
    
    const quantity = parseInt(quantityInput.value);
    const existingItemIndex = cart.findIndex(item => item.id === currentProduct.id);
    
    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            ...currentProduct,
            quantity: quantity
        });
    }
    
    updateCartCount();
    renderCartItems();
    closeProductModal();
    
    // Show added to cart notification
    showNotification(`${currentProduct.title} added to cart`);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Render cart items
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalPriceElement.textContent = '$0.00';
        return;
    }
    
    let totalPrice = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="item-quantity" data-id="${item.id}">
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
            </div>
            <i class="fas fa-times remove-item" data-id="${item.id}"></i>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Update total price
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    
    // Add event listeners to quantity controls
    document.querySelectorAll('.decrease-quantity').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = parseInt(btn.dataset.id);
            updateCartItemQuantity(itemId, -1);
        });
    });
    
    document.querySelectorAll('.increase-quantity').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = parseInt(btn.dataset.id);
            updateCartItemQuantity(itemId, 1);
        });
    });
    
    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', (e) => {
            const itemId = parseInt(input.dataset.id);
            const newQuantity = parseInt(e.target.value);
            
            if (newQuantity < 1) {
                e.target.value = 1;
                return;
            }
            
            updateCartItemQuantity(itemId, 0, newQuantity);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = parseInt(btn.dataset.id);
            removeFromCart(itemId);
        });
    });
}

// Update cart item quantity
function updateCartItemQuantity(itemId, change, newQuantity = null) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex >= 0) {
        if (newQuantity !== null) {
            cart[itemIndex].quantity = newQuantity;
        } else {
            cart[itemIndex].quantity += change;
            
            if (cart[itemIndex].quantity < 1) {
                cart[itemIndex].quantity = 1;
            }
        }
        
        updateCartCount();
        renderCartItems();
    }
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    renderCartItems();
    
    // Show notification
    showNotification('Item removed from cart');
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('active');
    document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : 'auto';
}

// Toggle mobile menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
}

// Close mobile menu when clicking on a link
function closeMobileMenuOnClick() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });
}

// Navigation scroll effect
function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Highlight active section while scrolling
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup all event listeners
function setupEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts(btn.dataset.filter);
        });
    });
    
    // Cart icon
    cartIcon.addEventListener('click', toggleCart);
    
    // Close cart
    closeCart.addEventListener('click', toggleCart);
    
    // Close modal
    closeModal.addEventListener('click', closeProductModal);
    
    // Modal overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProductModal();
        }
    });
    
    // Add to cart button
    addToCartBtn.addEventListener('click', addToCart);
    
    // Quantity controls
    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
    
    // Hamburger menu
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    closeMobileMenuOnClick();
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Highlight active section
    highlightActiveSection();
    
    // Smooth scrolling
    setupSmoothScrolling();
    
    // Search box focus
    if (searchBox) {
        searchBox.addEventListener('focus', () => {
            searchBox.parentElement.classList.add('focused');
        });
        
        searchBox.addEventListener('blur', () => {
            searchBox.parentElement.classList.remove('focused');
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);