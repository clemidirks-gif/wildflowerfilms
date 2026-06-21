document.addEventListener("DOMContentLoaded", () => {

     // --- Dynamic Logo Upload & Persistence ---
    const setupUploadableLogo = (inputId, imgId, textId, storageKey) => {
        const fileInput = document.getElementById(inputId);
        const logoImg = document.getElementById(imgId);
        const logoText = document.getElementById(textId);

        if (!fileInput || !logoImg || !logoText) return;

        // Check if there is an existing saved logo in localStorage
        const savedLogo = localStorage.getItem(storageKey);
        if (savedLogo) {
            logoImg.src = savedLogo;
            logoImg.classList.remove('hidden');
            logoText.classList.add('hidden');
        }

        // Handle new image upload
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                // Ensure it's an image
                if (!file.type.startsWith('image/')) {
                    alert('Please upload an image file.');
                    return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target.result;
                    
                    // Apply image to source and toggle visibility
                    logoImg.src = dataUrl;
                    logoImg.classList.remove('hidden');
                    logoText.classList.add('hidden');
                    
                    // Save to local storage for persistence across page refreshes
                    try {
                        localStorage.setItem(storageKey, dataUrl);
                    } catch (error) {
                        console.warn("Logo size might exceed localStorage limits. It will display but won't persist.", error);
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    };

    // Initialize both header and footer logo uploads
    setupUploadableLogo('nav-logo-input', 'nav-logo-img', 'nav-logo-text', 'artistry_nav_logo');
    setupUploadableLogo('footer-logo-input', 'footer-logo-img', 'footer-logo-text', 'artistry_footer_logo');
    
    // --- Custom Cursor ---
    const cursor = document.querySelector('.custom-cursor');

    document.addEventListener('mousemove', (e) => {
        // Move the custom cursor to follow the mouse
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
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
