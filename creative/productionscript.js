//
// ===============================
// HOVER MASK EFFECT (SMOOTH + CENTERED)
// ===============================
const heroSection = document.querySelector('.hero');

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();

        // mouse position relative to hero (NOT viewport)
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
    });

    function animateMask() {
        // smooth “liquid follow” motion
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;

        heroSection.style.setProperty('--mouseX', `${currentX}px`);
        heroSection.style.setProperty('--mouseY', `${currentY}px`);

        requestAnimationFrame(animateMask);
    }

    animateMask();
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

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 16, 7, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
    }
});


// ===============================
// SCROLL REVEAL (FIXED TYPO)
// ===============================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        // FIXED: intersection typo was broken
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition =
                "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";

            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('[data-scroll]').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
    revealObserver.observe(el);
});