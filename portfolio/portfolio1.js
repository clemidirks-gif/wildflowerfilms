document.addEventListener("DOMContentLoaded", () => {
    // --- Custom Cursor ---
    const cursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        // Move the custom cursor to follow the mouse
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add a hover effect to buttons and links using a CSS class toggle
    const hoverElements = document.querySelectorAll('a, button, .card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
        });
    });


    // Add a hover effect to buttons and links
    const hoverElements = document.querySelectorAll('a, button, .card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'rgba(17, 17, 17, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
    });

    // --- Dark Mode Theme Toggle ---
    const themeToggleBtn = document.getElementById('themeToggle');
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('invert-theme');
        if (document.body.classList.contains('invert-theme')) {
            themeToggleBtn.innerText = '☀️';
        } else {
            themeToggleBtn.innerText = '🌙';
        }
    });

    // --- Scroll Effects: Day to Night Transition & Parallax ---
    const nightOverlay = document.querySelector('.day-night-overlay');
    const heroSection = document.querySelector('.hero');
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
        // Get the current scroll position
        const scrollY = window.scrollY;

        // 1. Day to Night Transition
        // Calculate opacity based on scroll depth relative to the hero section's height
        const heroHeight = heroSection.offsetHeight;
        
        // The opacity goes from 0 to 0.9 (we cap it so it's a deep blue, not totally pitch black)
        let fadeProgress = Math.min(scrollY / (heroHeight * 0.8), 0.9);
        nightOverlay.style.opacity = fadeProgress;

        // --- Crossfade the Night SVG (Turn room light on) ---
        const nightSvg = document.querySelector('.night-svg');
        if (nightSvg) {
            // Allows the SVG opacity to safely reach 1.0
            nightSvg.style.opacity = Math.min(fadeProgress / 0.9, 1);
        }

        // Optional: Change text color in the hero dynamically based on darkness
        const heroText = document.querySelectorAll('.hero-content h1, .hero-content p');
        if (fadeProgress > 0.5) {
            heroText.forEach(el => el.style.color = '#ffffff');
            document.querySelector('.navbar .logo').style.color = '#ffffff';
            document.querySelectorAll('.navbar nav a').forEach(a => a.style.color = '#ffffff');
        } else {
            heroText.forEach(el => el.style.color = ''); // reset to CSS default
            document.querySelector('.navbar .logo').style.color = '';
            document.querySelectorAll('.navbar nav a').forEach(a => a.style.color = '');
        }

        // 2. Parallax Effect
        // Move elements at different speeds based on their data-speed attribute
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed');
            // Multiply scroll position by speed to create the delay/movement
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });

    // --- Animated Number Counter (from the About Us section) ---
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; 

    // Intersection Observer to trigger counting only when the section is in view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

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
