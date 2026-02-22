document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Navigation Link Update on Scroll
    const sections = document.querySelectorAll('section');

    const updateActiveLink = () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Adjust to trigger somewhat before the top reaches 0
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    // Initial call
    updateActiveLink();

    // Scroll Reveal Animation (Intersection Observer)
    // Add fade-in class to major elements dynamically
    const revealElements = document.querySelectorAll('.glass-card, .section-title, .hero-content, .blob-wrapper');

    revealElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    revealElements.forEach(el => {
        appearOnScroll.observe(el);
    });
    document.getElementById("contactForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData();
        // Use your actual entry IDs here:
        formData.append("entry.1405682626", document.getElementById("name").value);
        formData.append("entry.990110632", document.getElementById("email").value);
        formData.append("entry.2090737636", document.getElementById("message").value);

        fetch(
            "https://docs.google.com/forms/u/0/d/e/1FAIpQLScxVuZXZnIyJksK3gYTPXa88KzPZx18CRxE7yMrh2O4R0STyw/formResponse",
            {
                method: "POST",
                mode: "no-cors",
                body: formData,
            }
        )
            .then(() => {
                alert("Message sent successfully!");
                this.reset();
            })
            .catch(() => {
                alert("Failed to send message. Please try again.");
            });
    });
});
