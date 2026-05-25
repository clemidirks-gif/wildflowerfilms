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
    videoModal.classList.remove("active");
    videoFrame.src = "";
    document.body.style.overflow = "auto";
}

closeVideoBtn?.addEventListener("click", closeVideo);

videoModal?.addEventListener("click", (e) => {
    if (e.target === videoModal) closeVideo();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeVideo();
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
// NAVBAR SCROLL EFFECT
// ===============================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (!navbar) return;

    navbar.style.borderBottomColor =
        window.scrollY > 100
            ? 'rgba(212,165,116,0.2)'
            : 'rgba(212,165,116,0.1)';
});


// ===============================
// SCROLL ANIMATIONS
// ===============================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "scrollReveal 0.8s ease-out forwards";
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-scroll]').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    observer.observe(el);
});


// ===============================
// BOOKING MODAL SYSTEM
// ===============================

function bookPackage(name, price) {
    const modal = document.getElementById("bookingModal");

    document.getElementById("packageName").value = name;
    document.getElementById("packagePrice").value = "R" + price;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeBooking() {
    const modal = document.getElementById("bookingModal");

    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

window.bookPackage = bookPackage;
window.closeBooking = closeBooking;


// ===============================
// TERMS POPUPS
// ===============================

function openTerms(id) {
    document.getElementById(id)?.classList.add('active');
}

function closeTerms(id) {
    document.getElementById(id)?.classList.remove('active');
}

window.openTerms = openTerms;
window.closeTerms = closeTerms;

document.querySelectorAll('.terms-popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) popup.classList.remove('active');
    });
});


// ===============================
// SUCCESS POPUP
// ===============================

function showSuccessPopup() {
    const popup = document.createElement("div");

    popup.innerHTML = `
        <div style="
            position:fixed;
            bottom:30px;
            left:50%;
            transform:translateX(-50%);
            background:#fff;
            color:#000;
            padding:15px 25px;
            border-radius:50px;
            font-size:14px;
            z-index:99999;
            box-shadow:0 10px 30px rgba(0,0,0,0.2);
        ">
            Thanks! We’ll be in contact shortly.
        </div>
    `;

    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 4000);
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

        try {
            await Promise.all([
                emailjs.send("service_tdoof9d", "template_s9827wg", {
                    to_email: "clemidirks@gmail.com",
                    from_name: document.getElementById("fullName").value,
                    from_email: document.getElementById("email").value,
                    phone: document.getElementById("phone").value,
                    package_name: document.getElementById("packageName").value,
                    price: document.getElementById("packagePrice").value,
                    wedding_date: document.getElementById("weddingDate").value,
                    location: document.getElementById("location").value,
                    requests: document.getElementById("requests").value || "None"
                }),

                emailjs.send("service_tdoof9d", "template_s9827wg", {
                    to_email: document.getElementById("email").value,
                    from_name: document.getElementById("fullName").value,
                    package_name: document.getElementById("packageName").value
                })
            ]);

            bookingForm.reset();
            closeBooking();
            showSuccessPopup();

        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        }

        btn.innerText = "Confirm Booking";
    });
});


// ===============================
// ===============================
// EMAILJS - CONTACT FORM (FIXED)
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector("button[type='submit']");
        btn.innerText = "Sending...";

        // MATCHING YOUR HTML IDs EXACTLY
        const name = document.getElementById("contactName");
        const email = document.getElementById("contactEmail");
        const message = document.getElementById("contactMessage");

        // safety check (prevents crashes)
        if (!name || !email || !message) {
            console.error("Missing contact form fields");
            alert("Form error: missing fields.");
            btn.innerText = "Send Message";
            return;
        }

        try {
            await emailjs.send("service_tdoof9d", "template_s9827wg", {
                to_email: "clemidirks@gmail.com",
                from_name: name.value,
                from_email: email.value,
                message: message.value
            });

            contactForm.reset();
            showSuccessPopup();

        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        }

        btn.innerText = "Send Message";
    });
});
// ===============================
// INIT LOG
// ===============================

console.log("Wildflower Films portfolio loaded 🎬");