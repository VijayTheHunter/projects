document.addEventListener('DOMContentLoaded', () => {
    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    gsap.from('.hero-content > *', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Section Animations
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Project Card Animations
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Vanilla Tilt for Profile Image
    VanillaTilt.init(document.querySelector('.profile-image'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.5
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll Progress Indicator
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.getElementById('scrollProgress').style.width = scrollPercent + '%';
    }

    // Navbar Background on Scroll
    function updateNavbar() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    document.addEventListener('mousemove', e => {
        gsap.to(cursor, { duration: 0.1, x: e.clientX, y: e.clientY });
        gsap.to(follower, { duration: 0.3, x: e.clientX, y: e.clientY });
    });

    document.querySelectorAll('.btn, .project-link, .contact-link').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });

    // Typing Effect for Tagline
    function typeWriter(element, text, delay = 80) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, delay);
            } else {
                element.innerHTML += '<span class="cursor">|</span>';
                setTimeout(() => {
                    element.querySelector('.cursor').style.animation = 'blink 0.7s infinite';
                }, 500);
            }
        }
        type();
    }

    const tagline = document.querySelector('.hero .tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        setTimeout(() => typeWriter(tagline, originalText), 1000);
    }

    // Particle Effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 6 + 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(0, 212, 255, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '-1';
        document.body.appendChild(particle);

        const duration = Math.random() * 4000 + 3000;
        const drift = (Math.random() - 0.5) * 300;

        gsap.to(particle, {
            y: -(window.innerHeight + 200),
            x: drift,
            opacity: 0,
            duration: duration / 1000,
            ease: 'power1.out',
            onComplete: () => particle.remove()
        });
    }

    setInterval(createParticle, 1500);

    // Ripple Effect
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.4)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    document.querySelectorAll('.btn, .project-link, .contact-link').forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });

    // Scroll Event Listener
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateNavbar();
    });

    // Add Blink Animation for Typing Cursor
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            animation: blink 0.7s infinite;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
