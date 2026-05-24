// ===============================
// PORTFOLIO VIDEO (FIXED CLEAN)
// ===============================

const modal = document.getElementById("videoModal");
const frame = document.getElementById("videoFrame");
const closeBtn = document.querySelector(".close-video");

// OPEN VIDEO
document.querySelectorAll(".portfolio-card").forEach(card => {
    card.addEventListener("click", () => {
        const id = card.getAttribute("data-video");
        if (!id) return;

        frame.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

// CLOSE VIDEO
function closeVideo() {
    modal.classList.remove("active");
    frame.src = "";
    document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeVideo);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeVideo();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeVideo();
});


// ===============================
// CTA SCROLL
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
}, {
    threshold: 0.1
});

document.querySelectorAll('[data-scroll]').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    observer.observe(el);
});


// ===============================
// BOOKING SYSTEM
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
    document.getElementById(id).classList.add('active');
}

function closeTerms(id) {
    document.getElementById(id).classList.remove('active');
}

window.openTerms = openTerms;
window.closeTerms = closeTerms;

document.querySelectorAll('.terms-popup').forEach(popup => {
    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
});


// ===============================
// INIT
// ===============================
console.log("Wildflower Films portfolio loaded 🎬");

// ===============================
// EMAILJS BOOKING FORM (FIXED)
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const bookingForm = document.getElementById("bookingForm");

    if (!bookingForm) return;

    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = bookingForm.querySelector("button[type='submit']");
        submitBtn.innerText = "Sending...";

emailjs.send(
    "service_tdoof9d",
    "template_s9827wg",
    {
        from_name: document.getElementById("fullName").value,
        from_email: document.getElementById("email").value,
        reply_to: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        package_name: document.getElementById("packageName").value,

        price: document.getElementById("packagePrice").value,

        wedding_date: document.getElementById("weddingDate").value,

        location: document.getElementById("location").value,

        requests: document.getElementById("requests").value || "None",

        submitted_at: new Date().toLocaleString()
    },
    "XHHbEPSh0jtgCofVr"
)
        .then(() => {
            bookingForm.reset();
            closeBooking();

            submitBtn.innerText = "Confirm Booking";

            showSuccessPopup();
        })

        .catch((error) => {
            console.error(error);
            submitBtn.innerText = "Confirm Booking";
            alert("Something went wrong. Please try again.");
        });
    });
});

// ===============================
// SIMPLE SUCCESS POPUP
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
// CONTACT FORM EMAILJS
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const submitBtn = contactForm.querySelector("button[type='submit']");
        submitBtn.innerText = "Sending...";

        emailjs.send(
            "service_tdoof9d",
            "template_s9827wg",
            {
                from_name: document.getElementById("contactName").value,

                from_email: document.getElementById("contactEmail").value,

                reply_to: document.getElementById("contactEmail").value,

                requests: document.getElementById("contactMessage").value,

                submitted_at: new Date().toLocaleString()
            },
            "XHHbEPSh0jtgCofVr"
        )

        .then(() => {

            contactForm.reset();

            submitBtn.innerText = "Send Message";

            showSuccessPopup();

        })

        .catch((error) => {

            console.error(error);

            submitBtn.innerText = "Send Message";

            alert("Something went wrong. Please try again.");
        });

    });

});