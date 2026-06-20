console.log("Script loaded");
console.log("THREE:", window.THREE);
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
// SCROLL REVEAL
// ===============================

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

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

// ===============================
// STACKING COVER EFFECT
// ===============================

const stackSections = document.querySelectorAll('.stack-section');

function updateStackCards() {

    stackSections.forEach(section => {

        const rect = section.getBoundingClientRect();

        const progress =
            Math.min(
                Math.max(
                    (window.innerHeight - rect.top) /
                    window.innerHeight,
                    0
                ),
                1
            );

        const scale = 1 - (progress * 0.06);

        section.style.transform =
            `scale(${Math.max(scale, 0.94)})`;

    });

}

window.addEventListener('scroll', updateStackCards);

window.addEventListener('load', updateStackCards);

window.addEventListener('resize', updateStackCards);

// ===============================
// OPTIONAL PARALLAX TITLE EFFECT
// ===============================

const sectionTitles =
    document.querySelectorAll('.section-title');

window.addEventListener('scroll', () => {

    sectionTitles.forEach(title => {

        const rect = title.getBoundingClientRect();

        const speed = rect.top * 0.03;

        title.style.transform =
            `translateY(${speed}px)`;

    });

});
// ====================================
// THREE TEST
// ====================================

window.addEventListener('load', () => {

    console.log("Page loaded");

    const canvas = document.getElementById('fluid-canvas');

    console.log("Canvas:", canvas);

    if (!canvas) {
        console.error("Canvas not found");
        return;
    }

    if (typeof THREE === "undefined") {
        console.error("Three.js not loaded");
        return;
    }

    console.log("Three.js loaded");

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });

    const heroRight = document.querySelector('.hero-right');

    renderer.setSize(
        heroRight.clientWidth,
        heroRight.clientHeight
    );

    renderer.setClearColor(0x001007);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    heroRight.clientWidth / heroRight.clientHeight,
    0.1,
    1000
);

camera.position.z = 2;

const geometry = new THREE.PlaneGeometry(2, 2);

const material = new THREE.MeshBasicMaterial({
    color: 0x2f6b45
});

const plane = new THREE.Mesh(
    geometry,
    material
);

scene.add(plane);

renderer.render(scene, camera);

console.log("Renderer created");
});