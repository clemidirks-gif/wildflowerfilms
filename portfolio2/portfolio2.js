document.addEventListener('DOMContentLoaded', () => {

// --- Navigation Background Shift on Scroll ---
const navbar = document.getElementById('navbar');

function updateNavbar() {
if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

// --- Mobile Navigation Toggle Logic ---
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');

if (burgerMenu && navLinks) {
    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    // Automatically close the menu when a link inside it is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });
}

// --- High-Performance Parallax Engine (RAF-based) ---
const parallaxSections = document.querySelectorAll('.parallax-section');
const heroBg = document.getElementById('hero-bg');
const bannerBg = document.getElementById('banner-bg');
let lastScrollY = window.scrollY;
let ticking = false;

function onScroll() {
        lastScrollY = window.scrollY;
if (!ticking) {
            window.requestAnimationFrame(() => {
// Update navigation style
updateNavbar();
// Calculate and apply parallax translations
applyParallax();
// Trigger scroll-revealed elements
revealOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

function applyParallax() {
// Parallax for Section 1 (Hero Background)
if (heroBg) {
const rect = document.getElementById('section1').getBoundingClientRect();
// Translate the background relative to viewport scroll depth
if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
const speed = 0.4; // Scroll speed scaling factor
const yOffset = rect.top * speed;
                heroBg.style.transform = `translate3d(0, ${-yOffset}px, 0)`;
            }
        }
// Parallax for Section 3 (Secondary Palm Banner)
if (bannerBg) {
const section3 = document.getElementById('section3');
const rect = section3.getBoundingClientRect();
if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
const speed = 0.35;
// Center-based focal calculation
const offsetFromCenter = (rect.top + rect.height / 2) - (window.innerHeight / 2);
const yOffset = offsetFromCenter * speed;
                bannerBg.style.transform = `translate3d(0, ${yOffset}px, 0)`;
            }
        }
    }

// --- Scroll-Triggered Reveal Mechanics (Webflow Style) ---
const reveals = document.querySelectorAll('.reveal');
function revealOnScroll() {
const threshold = 100; // Trigger cushion depth in px
reveals.forEach(element => {
const elementTop = element.getBoundingClientRect().top;
const windowHeight = window.innerHeight;
if (elementTop < windowHeight - threshold) {
element.classList.add('active');
            }
        });
    }

// Passive listener for high performance on touch & scrolling gestures
window.addEventListener('scroll', onScroll, { passive: true });

// Instantly calculate current scroll states on initial page loading
updateNavbar();
applyParallax();
revealOnScroll();
});

// --- Card Accordion Toggle Logic (Global Scope Triggers) ---
function toggleCard(cardId) {
const selectedCard = document.getElementById(cardId);
if (!selectedCard) return;

const isExpanding = !selectedCard.classList.contains('expanded');

if (isExpanding) {
// Collapse any other open cards
document.querySelectorAll('.product-card.expanded').forEach(card => {
if (card.id !== cardId) {
card.classList.remove('expanded');
            }
        });
// Expand target card
selectedCard.classList.add('expanded');
    } else {
// Close target card
selectedCard.classList.remove('expanded');
    }
}
