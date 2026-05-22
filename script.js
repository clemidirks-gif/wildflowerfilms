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
document.querySelector('.cta-button')?.addEventListener('click', () => {
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
// IMAGE FADE IN
// ===============================
document.querySelectorAll(".portfolio-image img").forEach(img => {
    img.style.opacity = 0;
    img.style.transition = "opacity 0.6s ease";

    const imgObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                imgObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    imgObserver.observe(img);
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