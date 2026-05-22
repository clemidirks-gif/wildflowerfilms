// ===============================
// VIDEO MODAL SYSTEM (PORTFOLIO)
// ===============================
const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");

document.querySelectorAll(".portfolio-card").forEach(card => {
    card.addEventListener("click", () => {

        const videoSrc = card.getAttribute("data-video");
        if (!videoSrc) return;

        modalVideo.src = videoSrc;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";

        const playPromise = modalVideo.play();

        if (playPromise !== undefined) {
            playPromise.catch(err => {
                console.log("Autoplay issue:", err);
            });
        }
    });
});

function closeVideo() {
    modal.classList.remove("active");
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = "";
    document.body.style.overflow = "auto";
}

window.closeVideo = closeVideo;


// close modal on outside click
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeVideo();
    }
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
    });

    imgObserver.observe(img);
});


// ===============================
// BOOKING SYSTEM (SAFE)
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
// INIT
// ===============================
console.log("Wildflower Films portfolio loaded 🎬");

function openTerms(id) {
    document.getElementById(id).classList.add('active');
}

function closeTerms(id) {
    document.getElementById(id).classList.remove('active');
}

/* Close when clicking outside popup */

document.querySelectorAll('.terms-popup').forEach(popup => {
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
});