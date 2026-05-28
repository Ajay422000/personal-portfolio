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
   document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Your Telegram Bot Token
    const botToken = "8127437587:AAFlJRazj2zdOqh_HKsp1-XcsRuTpQobVg8";

    // Your Telegram Group Chat ID
    const chatId = "-1003920952111";

    const text = `
🔥 New Portfolio Message

👤 Name: ${name}
📧 Email: ${email}
💬 Message: ${message}
`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text
            })
        });

        alert("Message sent successfully!");
        this.reset();

    } catch (error) {
        alert("Failed to send message.");
    }
    });
});
