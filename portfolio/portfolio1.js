document.addEventListener("DOMContentLoaded", () => {

    const cursor = document.querySelector('.custom-cursor');
    const themeToggleBtn = document.getElementById('themeToggle');
    const darkSections = document.querySelectorAll('.footer, .card-dark, .card-orange, .card-red, .btn-primary');
    const nightOverlay = document.querySelector('.day-night-overlay');
    const heroSection = document.querySelector('.hero');
    const parallaxElements = document.querySelectorAll('.parallax');
    const hoverElements = document.querySelectorAll('a, button, .card');

    // --- Single function to decide cursor color ---
    function updateCursorColor() {
        const isDarkMode = document.body.classList.contains('invert-theme');
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        // Is it "night time" in the hero section?
        const fadeProgress = Math.min(scrollY / (heroHeight * 0.8), 0.9);
        
        // --- THIS IS THE FIX ---
        // Only consider it "night" if we are scrolled past the halfway point
        // AND we are still inside the hero section's visible area.
        const isNightSection = fadeProgress > 0.5 && scrollY < heroHeight;

        if (isDarkMode || isNightSection) {
            cursor.style.borderColor = '#fff';
            if (cursor.classList.contains('hovering')) {
                cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }
        } else {
            cursor.style.borderColor = '#111';
            if (cursor.classList.contains('hovering')) {
                cursor.style.backgroundColor = 'rgba(17, 17, 17, 0.1)';
            }
        }
    }

    // --- Event Listeners ---

    // 1. Mouse Movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 2. Hovering over interactive elements
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
            updateCursorColor(); // Update color on hover
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
            cursor.style.backgroundColor = 'transparent'; // Always transparent when not hovering
            updateCursorColor();
        });
    });

    // 3. Hovering over specific dark sections
    darkSections.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Force white, but only if not already white from a global rule
            if (cursor.style.borderColor !== 'rgb(255, 255, 255)') {
                 cursor.style.borderColor = '#fff';
            }
        });
        el.addEventListener('mouseleave', () => {
             // On mouse leave, re-evaluate the global state
             updateCursorColor()
        });
    });

    // 4. Dark Mode Toggle
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('invert-theme');
        themeToggleBtn.innerText = document.body.classList.contains('invert-theme') ? '☀️' : '🌙';
        updateCursorColor();
    });

    // 5. Page Scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Parallax Effect
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed');
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });

        // Day-to-Night Hero Transition
        const heroHeight = heroSection.offsetHeight;
        let fadeProgress = Math.min(scrollY / (heroHeight * 0.8), 0.9);
        nightOverlay.style.opacity = fadeProgress;

        // Crossfade the Night SVG
        const nightSvg = document.querySelector('.night-svg');
        if (nightSvg) {
            nightSvg.style.opacity = Math.min(fadeProgress / 0.9, 1);
        }

        // Update Text and Cursor Color
        const heroText = document.querySelectorAll('.hero-content h1, .hero-content p, .navbar nav a');
        if (fadeProgress > 0.5) {
            heroText.forEach(el => el.style.color = '#ffffff');
        } else {
            heroText.forEach(el => el.style.color = '');
        }
        
        updateCursorColor();
    });

    // --- Animated Number Counter (No changes) ---
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => {
        observer.observe(counter);
    });
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => animateCounter(counter), 10);
        } else {
            counter.innerText = target;
        }
    };
});
