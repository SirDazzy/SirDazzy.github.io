document.addEventListener("DOMContentLoaded", () => {
    initTypingEffect();
    initNavigationScroll();
    initCollapsibleCards();
    initCategoryFilter();
    initClipboardBadges();
    initBackToTop();
});

function initTypingEffect() {
    const phrases = [
        "Software Engineering Student",
        "Computer Vision & 3D Spatial Intern",
        "UTS Final-Year Engineer",
        "Director of IT @ VSA NSW"
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenPhrases = 1800;
    const typingElement = document.getElementById("typing-text");

    if (!typingElement) return;

    function typeEffect() {
        const currentPhrase = phrases[phraseIdx];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
        }

        let delta = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIdx === currentPhrase.length) {
            delta = delayBetweenPhrases;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            delta = 500;
        }

        setTimeout(typeEffect, delta);
    }

    typeEffect();
}

function initNavigationScroll() {
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-item");
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });

        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        }
    });
}

function initBackToTop() {
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function initCollapsibleCards() {
    const cards = document.querySelectorAll(".content-card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("collapsed");
        });
    });
}

function initCategoryFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".content-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");
            cards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || filterValue === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

function initClipboardBadges() {
    const copyBadges = document.querySelectorAll("[data-copy]");
    copyBadges.forEach(badge => {
        badge.addEventListener("click", () => {
            const textToCopy = badge.getAttribute("data-copy");
            const successMsg = badge.getAttribute("data-msg") || "Copied to clipboard!";
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(successMsg);
            });
        });
    });
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (toast) {
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }
}