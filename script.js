// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Menu Toggle
const mobileMenuIcon = document.getElementById('mobile-menu-icon');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuIcon.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuIcon.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuIcon.querySelector('i').classList.remove('fa-times');
        mobileMenuIcon.querySelector('i').classList.add('fa-bars');
    });
});

// Sticky Navbar Background on Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // If it's a counter, animate the numbers
            if (entry.target.classList.contains('hero-content')) {
                animateCounters();
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select elements to animate
const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
animatedElements.forEach(el => observer.observe(el));

// Number Counter Animation
let countersAnimated = false;
function animateCounters() {
    if (countersAnimated) return;
    
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // The lower the slower
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            
            // Lower inc to slow and higher to fast
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
    
    countersAnimated = true;
}

// Form Submission handling (Prevent default for demo)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = 'Sending...';
    btn.style.opacity = '0.8';
    
    setTimeout(() => {
        btn.innerText = 'Message Sent Successfully!';
        btn.style.backgroundColor = '#25D366';
        btn.style.color = 'white';
        this.reset();
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.style.opacity = '1';
        }, 3000);
    }, 1500);
});
