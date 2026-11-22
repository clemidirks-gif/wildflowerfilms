// ===============================
// PORTFOLIO VIDEO MODAL
// ===============================
const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const closeVideoBtn = document.querySelector(".close-video");

document.querySelectorAll(".portfolio-card").forEach(card => {
    card.addEventListener("click", () => {
        const id = card.getAttribute("data-video");
        if (!id) return;

        videoFrame.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
        videoModal.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

function closeVideo() {
    if (!videoModal) return;
    videoModal.classList.remove("active");
    videoFrame.src = "";
    document.body.style.overflow = "";
}

closeVideoBtn?.addEventListener("click", closeVideo);

videoModal?.addEventListener("click", (e) => {
    if (e.target === videoModal) closeVideo();
});

// ===============================
// HERO CTA SCROLL
// ===============================
document.querySelector('.hero-cta')?.addEventListener('click', () => {
    document.querySelector('#portfolio')?.scrollIntoView({
        behavior: 'smooth'
    });
});

// ===============================
// NAVBAR FROSTED SCROLL EFFECT
// ===============================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===============================
// SCROLL REVEAL ANIMATION
// ===============================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('[data-scroll]').forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms`;
    revealObserver.observe(el);
});

// ===============================
// BOOKING MODAL SYSTEM
// ===============================
function bookPackage(name, price) {
    const modal = document.getElementById("bookingModal");
    document.getElementById("packageName").value = name;
    document.getElementById("packagePrice").value = "R" + price.toLocaleString();

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeBooking() {
    const modal = document.getElementById("bookingModal");
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

document.getElementById("bookingModal")?.addEventListener("click", (e) => {
    if (e.target.id === "bookingModal") closeBooking();
});

window.bookPackage = bookPackage;
window.closeBooking = closeBooking;

// ===============================
// TERMS POPUPS
// ===============================
function openTerms(id) {
    document.getElementById(id)?.classList.add('active');
    document.body.style.overflow = "hidden";
}

function closeTerms(id) {
    document.getElementById(id)?.classList.remove('active');
    document.body.style.overflow = "";
}

window.openTerms = openTerms;
window.closeTerms = closeTerms;

document.querySelectorAll('.terms-popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            document.body.style.overflow = "";
        }
    });
});

// Close any open modal with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeVideo();
        closeBooking();
        document.querySelectorAll('.terms-popup.active').forEach(p => p.classList.remove('active'));
        document.body.style.overflow = "";
    }
});

// ===============================
// TOAST NOTIFICATION
// ===============================
function showSuccessPopup(text = "Thanks! We’ll be in contact shortly.") {
    const popup = document.createElement("div");
    popup.innerHTML = `
        <div style="
            position:fixed;
            bottom:28px;
            left:50%;
            transform:translateX(-50%);
            background:#f8f6f2;
            color:#040906;
            padding:14px 26px;
            border-radius:999px;
            font-family:'Rethink Sans',sans-serif;
            font-size:14px;
            font-weight:500;
            letter-spacing:0.02em;
            z-index:99999;
            border:1px solid rgba(216,194,157,0.6);
            box-shadow:0 16px 40px rgba(0,0,0,0.45);
        ">
            ${text}
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 4200);
}

// ===============================
// EMAILJS - BOOKING FORM
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("bookingForm");
    if (!bookingForm) return;

    bookingForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = bookingForm.querySelector("button[type='submit']");
        btn.innerText = "Sending...";
        btn.disabled = true;

        try {
            await emailjs.send("service_tdoof9d", "template_s9827wg", {
                to_email: document.getElementById("email").value,
                from_name: document.getElementById("fullName").value,
                from_email: document.getElementById("email").value,
                reply_to: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                package_name: document.getElementById("packageName").value,
                price: document.getElementById("packagePrice").value,
                wedding_date: document.getElementById("weddingDate").value,
                location: document.getElementById("location").value,
                requests: document.getElementById("requests").value || "None"
            });

            bookingForm.reset();
            closeBooking();
            showSuccessPopup("Booking request sent! We’ll be in touch shortly.");
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        } finally {
            btn.innerText = "Confirm Booking Request";
            btn.disabled = false;
        }
    });
});

// ===============================
// EMAILJS - CONTACT FORM
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector("button[type='submit']");
        btn.innerText = "Sending...";
        btn.disabled = true;

        const name = document.getElementById("contactName");
        const email = document.getElementById("contactEmail");
        const message = document.getElementById("contactMessage");

        try {
            await emailjs.send("service_tdoof9d", "template_7cv8xqr", {
                to_email: email.value,
                from_name: name.value,
                from_email: email.value,
                reply_to: email.value,
                message: message.value
            });

            contactForm.reset();
            showSuccessPopup("Message sent! We’ll reply to you shortly.");
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        } finally {
            btn.innerText = "Send Message";
            btn.disabled = false;
        }
    });
});

// ===============================
// HAMBURGER MENU TOGGLE
// ===============================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}