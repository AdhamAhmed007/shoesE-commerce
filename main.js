const shoesAPI = "https://raw.githubusercontent.com/iffi96/Shoe-store-data-json/master/data004.json";
let allShoes = []; 
let limitedShoes = []; 
let cart = []; 


document.addEventListener("DOMContentLoaded", () => {
    getShoes();
    setupModalCloseEvents();
    updateCartIcon();
    setupOutsideClickClose(); 
});


async function getShoes() {
    try {
        const response = await fetch(shoesAPI);
        const data = await response.json();
        allShoes = Object.values(data);
        limitedShoes = allShoes.slice(0, 8);
        displayShoes(limitedShoes);
    } catch (error) {
        console.error("Error fetching shoe data:", error);
    }
}


function displayShoes(shoes) {
    const container = document.getElementById('products-container');
    if(!container) return; 

    container.innerHTML = ""; 

    shoes.forEach(shoe => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${shoe.imageURL}" alt="${shoe.name}" style="width:100% ; padding: 20px;" class="img0" onclick="openZoom('${shoe.imageURL}')">
                <div class="info">
                    <h2>${shoe.name}</h2>
                    <span class="price">$${shoe.price}</span>
                </div>
                <p>Brand: ${shoe.brand}</p>
                <button class="btn0" onclick="addToCart('${shoe.name.replace(/'/g, "\\'")}', ${shoe.price})">ADD TO CART</button>
            </div>
        `;
    });
}


// ---(Filter & Sort Function) ---
function filterAndSortShoes() {
    const searchInputValue = document.getElementById("searchInput").value.toLowerCase();
    const sortValue = document.getElementById("sortSelect").value;

    let filteredShoes = limitedShoes.filter(shoe => {
        return shoe.name.toLowerCase().includes(searchInputValue);
    });

    if (sortValue === "price-low") {
        filteredShoes.sort((a, b) => a.price - b.price); 
    } else if (sortValue === "price-high") {
        filteredShoes.sort((a, b) => b.price - a.price); 
    } else if (sortValue === "name-asc") {
        filteredShoes.sort((a, b) => a.name.localeCompare(b.name)); 
    }

    displayShoes(filteredShoes);
}




function showNotification(message, type = "normal") {
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        toastContainer.className = "toast-container";
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = `toast-notification ${type === "success" ? "success" : ""}`;
    
    const iconHTML = type === "success" 
        ? `<i class="fa-solid fa-check" style="color: #2ecc71;"></i>` 
        : `<i class="fa-solid fa-bookmark" style="color: #d12a2a;"></i>`; 
    
    toast.innerHTML = `
        ${iconHTML}
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    setTimeout(() => { toast.classList.add("show"); }, 50);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => { toast.remove(); }, 400);
    }, 3000);
}

function addToCart(shoeName, shoePrice) {
    cart.push({ name: shoeName, price: shoePrice });
    updateCartIcon();
    renderMiniCart();
    
    showNotification(`ADDED TO CART: ${shoeName}`);
}

function updateCartIcon() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.innerText = cart.length; 
    }
}

function toggleMiniCart(event) {
    event.stopPropagation(); 
    const miniCart = document.getElementById("mini-cart");
    if (miniCart) {
        miniCart.classList.toggle("active");
    }
}




function renderMiniCart() {
    const itemsContainer = document.getElementById("mini-cart-items");
    const totalPriceElement = document.getElementById("cart-total-price");
    
    if (!itemsContainer || !totalPriceElement) return;

    if (cart.length === 0) {
        itemsContainer.innerHTML = `<p class="empty-cart-msg">Your cart is empty.</p>`;
        totalPriceElement.innerText = "$0";
        return;
    }

    itemsContainer.innerHTML = ""; 
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const itemRow = document.createElement("div");
        itemRow.className = "cart-item-row";

        const itemInfo = document.createElement("div");
        itemInfo.className = "cart-item-info";

        const itemTitle = document.createElement("h4");
        itemTitle.innerText = item.name;

        const itemPrice = document.createElement("span");
        itemPrice.innerText = `$${item.price}`;

        itemInfo.appendChild(itemTitle);
        itemInfo.appendChild(itemPrice);

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-item-btn";
        removeBtn.innerHTML = `<i class="fa-solid fa-trash" id="trashIcon"></i>`;
        
        removeBtn.addEventListener("click", (event) => {
            event.stopPropagation(); 
            removeFromCart(index);
        });

        itemRow.appendChild(itemInfo);
        itemRow.appendChild(removeBtn);

        itemsContainer.appendChild(itemRow);
    });

    totalPriceElement.innerText = `$${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1); 
    updateCartIcon();
    renderMiniCart(); 
}




function confirmOrder() {
    if (cart.length === 0) {
        showNotification("Your cart is empty! Add products to confirm.", "normal");
        return;
    }
    
    showNotification("ORDER CONFIRMED! Thank you for shopping with APEX.", "success");
    
    cart = []; 
    updateCartIcon();
    renderMiniCart();
    
    const miniCart = document.getElementById("mini-cart");
    if (miniCart) miniCart.classList.remove("active");
}

function setupOutsideClickClose() {
    document.addEventListener("click", (event) => {
        const miniCart = document.getElementById("mini-cart");
        const cartContainer = document.getElementById("cart-icon-container");
        
        if (miniCart && miniCart.classList.contains("active")) {
            if (!miniCart.contains(event.target) && !cartContainer.contains(event.target)) {
                miniCart.classList.remove("active");
            }
        }
    });
}


// ---(Modal Image Zoom) ---
function openZoom(imageSrc) {
    const modal = document.getElementById("imageModal");
    const zoomedImage = document.getElementById("zoomedImage");

    if (modal && zoomedImage) {
        modal.style.display = "flex"; 
        zoomedImage.src = imageSrc;   
    }
}

function setupModalCloseEvents() {
    document.addEventListener("click", (e) => {
        const modal = document.getElementById("imageModal");
        const closeBtn = document.querySelector(".close-btn");
        if (modal) {
            if (e.target === closeBtn || e.target === modal) {
                modal.style.display = "none"; 
            }
        }
    });
}
