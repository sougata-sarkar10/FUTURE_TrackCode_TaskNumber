// 1. Hero message fade-in
window.addEventListener("DOMContentLoaded", () => {
    const heroMsg = document.querySelector(".hero-msg");
    heroMsg.style.opacity = 0;
    heroMsg.style.transition = "opacity 2s ease-in-out";
    setTimeout(() => {
        heroMsg.style.opacity = 1;
    }, 300);
});

// 2. Search bar focus effect
const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("focus", () => {
    searchInput.style.boxShadow = "0 0 5px 2px #febd68";
});
searchInput.addEventListener("blur", () => {
    searchInput.style.boxShadow = "none";
});

// 3. Smooth scroll to top
document.querySelector(".foot-panel1").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 4. Cart click demo
let cartCount = 0;
document.querySelector(".nav-cart").addEventListener("click", () => {
    cartCount++;
    alert("Item added to cart (demo) - Count: " + cartCount);
});

// 5. Account section click (future feature)
document.querySelector(".nav-singin").addEventListener("click", () => {
    alert("Account menu clicked (future feature)");
});

let currentIndex = 0;
const slides = document.querySelectorAll(".hero-slide");
const slider = document.querySelector(".hero-slider");
const totalSlides = slides.length;

setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}, 4000); // change image every 4 seconds
