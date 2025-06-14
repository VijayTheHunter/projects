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

    // Contact Method Animations
    gsap.utils.toArray('.contact-method').forEach((method, index) => {
        gsap.from(method, {
            opacity: 0,
            x: -30,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.contact-methods',
                start: 'top 80%',
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

    // Awards Carousel
    const swiper = new Swiper('.awards-carousel', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        loopAdditionalSlides: 3,
        centeredSlides: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        speed: 1000,
        grabCursor: true,
        touchEventsTarget: 'container',
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 10,
            }
        }
    });

    // Award Modal Functionality
    const modal = document.getElementById('awardModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalDetails = document.getElementById('modalDetails');
    const closeModal = document.querySelector('.award-modal-close');

    const awardsData = {
        award1: {
            title: 'VINTRA 2023 - 1st Place',
            description: 'Arduino Workshop',
            details: 'Awarded 1st place in the Arduino Workshop event at VINTRA 2023, an intramural annual co-curricular fest held on 17-18 August 2023, organized by the Department of ECE, School of SEET, Kalasalingam Academy of Research and Education.'
        },
        award2: {
            title: 'Euphoria 2025 - 2nd Place',
            description: 'Sustainosphere',
            details: 'Secured 2nd place in the Sustainosphere event at Euphoria 2025, a techno-management meet held on 13-14 March 2025, organized by the Department of ECE, School of Electronics, Electrical & Biomedical, Kalasalingam Academy of Research and Education.'
        },
        award3: {
            title: 'VINTRA 2024 - 2nd Place',
            description: 'IOTROPOLIS',
            details: 'Secured 2nd place in the IOTROPOLIS event at VINTRA 2024, an intramural annual co-curricular fest held on 18-19 October 2024, organized by the Department of ECE, School of SEET, Kalasalingam Academy of Research and Education.'
        },
        award4: {
            title: 'VINTRA 2024 - 1st Place',
            description: 'MATHFLIX',
            details: 'Achieved 1st place in the MATHFLIX event at VINTRA 2024, an intramural annual co-curricular fest held on 18-19 October 2024, organized by the Department of ECE, School of SEET, Kalasalingam Academy of Research and Education.'
        },
        award5: {
            title: 'Robocraze 2025 - Winner',
            description: 'Arduino Project-A-Thon',
            details: 'Winner of the Arduino Project-A-Thon by Robocraze in May 2025, certified by Daniel D\'Souza (Chief Technical Officer) and Pranay Agarwal (Chief Executive Officer). Certificate Number: RC/34/003.'
        },
        award6: {
            title: 'IoTronz 2023 - 3rd Place',
            description: 'IoT Innovation Challenge',
            details: 'Achieved 3rd place in the IoT Innovation Challenge at IoTronz 2023, a national-level hackathon held on 10-11 June 2023, organized by the IoT Research and Innovation Lab, India.'
        }
    };

    document.querySelectorAll('.award-item').forEach(item => {
        item.addEventListener('click', () => {
            const awardId = item.getAttribute('data-award-id');
            const award = awardsData[awardId];
            if (award) {
                modalTitle.textContent = award.title;
                modalDescription.textContent = award.description;
                modalDetails.textContent = award.details;
                modal.style.display = 'flex';
                swiper.autoplay.stop();
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        swiper.autoplay.start();
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            swiper.autoplay.start();
        }
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

    document.querySelectorAll('.btn, .project-link, .contact-link, .award-item, .contact-method').forEach(element => {
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
