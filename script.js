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