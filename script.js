const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");
});

const newsletterForm = document.getElementById("newsletter-form");

newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    alert("Thank you for subscribing to DAILY CUP!");

    newsletterForm.reset();
});

// =====================================
// DAILY CUP - MAIN JAVASCRIPT
// =====================================


// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("show");

        menuToggle.setAttribute(
            "aria-expanded",
            navbar.classList.contains("show")
        );
    });

    navbar.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            navbar.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");
        });

    });

}


// 2. SHOPPING CART

let cart = [];

try {
    cart = JSON.parse(
        localStorage.getItem("dailyCupCart")
    ) || [];
} catch (error) {
    cart = [];
}


function saveCart() {

    localStorage.setItem(
        "dailyCupCart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {

        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        cartCount.textContent = totalItems;

    }

}


// Update cart on every page

updateCartCount();


// 3. ADD PRODUCT TO CART

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        if (!name || !Number.isFinite(price) || price <= 0) {
            return;
        }

        const existingProduct = cart.find(
            item => item.name === name
        );

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        saveCart();

        const oldText = button.textContent;

        button.textContent = "✓";
        button.style.background = "#b47b50";

        setTimeout(() => {
            button.textContent = oldText;
            button.style.background = "";
        }, 800);

    });

});


// 4. CART SUMMARY

const cartLinks = document.querySelectorAll(".cart-link");

cartLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        if (cart.length === 0) {

            alert("Your cart is empty. Add some coffee first!");

            return;

        }

        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const items = cart.map(item =>
            `${item.name} x ${item.quantity}`
        ).join("\n");

        alert(
            "YOUR DAILY CUP CART\n\n" +
            items +
            "\n\nTotal: $" + total.toFixed(2)
        );

    });

});


// 5. MENU FILTER

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        productCards.forEach(card => {

            const category = card.dataset.category;

            if (
                selectedCategory === "all" ||
                category === selectedCategory
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


// 6. CONTACT FORM

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");
        const formMessage = document.getElementById("form-message");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name.value.trim()) {

            formMessage.textContent = "Please enter your name.";
            return;

        }

        if (!emailPattern.test(email.value.trim())) {

            formMessage.textContent = "Please enter a valid email address.";
            email.focus();
            return;

        }

        if (!subject.value.trim() || !message.value.trim()) {

            formMessage.textContent = "Please complete all fields.";
            return;

        }

        formMessage.textContent =
            `Thank you, ${name.value.trim()}! Your message has been received.`;

        contactForm.reset();

    });

}


// 7. NEWSLETTER FORM

const newsletterForm = document.getElementById("newsletter-form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", event => {

        event.preventDefault();

        alert("Thank you for subscribing to DAILY CUP!");

        newsletterForm.reset();

    });

}


// 8. CURRENT YEAR

const copyrightElements = document.querySelectorAll(".copyright");

copyrightElements.forEach(element => {

    element.textContent =
        `© ${new Date().getFullYear()} DAILY CUP. All rights reserved.`;

});



