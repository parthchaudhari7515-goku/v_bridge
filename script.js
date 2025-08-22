// Initialize Lucide icons
lucide.createIcons();

// Typing Animation
const typingText = document.getElementById('typing-text');
const text = 'Vipulkumar Chaudhari';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'font-semibold');
        link.classList.add('text-gray-700');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-700');
            link.classList.add('text-blue-600', 'font-semibold');
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// Carousel Functionality
let currentSlide = 0;
const carousel = document.getElementById('carousel');
const totalSlides = 4;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const thumbnails = document.querySelectorAll('.carousel-thumb');

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update thumbnails
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('opacity-100', index === currentSlide);
        thumb.classList.toggle('opacity-50', index !== currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    updateCarousel();
}

// Event listeners for carousel
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Thumbnail navigation
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

// Auto-advance carousel
setInterval(nextSlide, 5000);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// QR Code Generation
function generateQRCode() {
    const currentURL = window.location.href;
    const qrCodeContainer = document.getElementById('qrcode');
    
    // Clear existing QR code
    qrCodeContainer.innerHTML = '';
    
    // Generate QR code using QR Server API
    const qrImg = document.createElement('img');
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(currentURL)}`;
    qrImg.alt = 'QR Code for Portfolio';
    qrImg.className = 'w-32 h-32';
    qrCodeContainer.appendChild(qrImg);
    
    return qrImg.src;
}

// Download QR Code
document.getElementById('downloadQR').addEventListener('click', function() {
    const qrURL = generateQRCode();
    
    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = qrURL;
    link.download = 'vipul-chaudhari-portfolio-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Generate QR code on page load
window.addEventListener('load', generateQRCode);

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        scrollToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        scrollToTopBtn.classList.add('opacity-0', 'invisible');
        scrollToTopBtn.classList.remove('opacity-100', 'visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add subtle parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.getElementById('home');
    const parallax = scrolled * 0.5;
    heroSection.style.transform = `translateY(${parallax}px)`;
});

// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Re-initialize Lucide icons for dynamically added content
    lucide.createIcons();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
});

// Enhanced scroll animations with stagger effect
function addStaggerEffect() {
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Call stagger effect on page load
window.addEventListener('load', addStaggerEffect);

// Add hover effects for cards
document.querySelectorAll('.hover\\:transform').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skills progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('[class*="w-["]');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
        bar.style.transition = 'width 2s ease-in-out';
        
        setTimeout(() => {
            const targetWidth = bar.className.match(/w-\[(\d+)%\]/);
            if (targetWidth) {
                bar.style.width = targetWidth[1] + '%';
            }
        }, 500);
    });
}

// Trigger progress bar animation when skills section is visible
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}