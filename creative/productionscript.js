// ===============================
// HOVER MASK EFFECT (SQUIGGLE)
// ===============================
const heroSection = document.querySelector('.hero');

if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        // Get mouse coordinates relative to the viewport
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Set CSS variables on the hero section to update the mask position
        heroSection.style.setProperty('--mouseX', `${mouseX}px`);
        heroSection.style.setProperty('--mouseY', `${mouseY}px`);
    });
}

// ===============================
// HERO CTA SCROLL
// ===============================
document.querySelector('.hero-cta')?.addEventListener('click', () => {
    document.querySelector('#web-design')?.scrollIntoView({
        behavior: 'smooth'
    });
});

// ===============================
// NAVBAR SCROLL EFFECT
// ===============================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (!navbar) return;
    // Add a slight dark background to navbar on scroll for readability
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 16, 7, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
    }
});

// ===============================
// WEBFLOW-STYLE SCROLL REVEAL
// ===============================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('[data-scroll]').forEach((el, i) => {
    // Stagger effect
    el.style.transitionDelay = `${i * 80}ms`;
    revealObserver.observe(el);
});

const hero = document.querySelector('.hero');
const feDisplacement = document.querySelector('feDisplacementMap');

let currentScale = 0;
let targetScale = 0;

if (hero && feDisplacement) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // increase distortion near cursor movement
        targetScale = 20 + (Math.abs(x - 0.5) + Math.abs(y - 0.5)) * 40;
    });

    hero.addEventListener('mouseleave', () => {
        targetScale = 20;
    });

    function animate() {
        currentScale += (targetScale - currentScale) * 0.1;

        feDisplacement.setAttribute('scale', currentScale.toFixed(2));

        requestAnimationFrame(animate);
    }

    animate();
}