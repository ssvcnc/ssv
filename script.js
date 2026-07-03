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

// Form Submission handling (Save details locally to ssv/enquiry)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = 'Sending...';
    btn.style.opacity = '0.8';
    btn.disabled = true;
    
    fetch('/submit-enquiry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone, email, message })
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
    })
    .then(data => {
        btn.innerText = 'Inquiry Submitted Successfully!';
        btn.style.backgroundColor = '#25D366';
        btn.style.color = 'white';
        this.reset();
    })
    .catch(error => {
        console.error('Error submitting enquiry:', error);
        btn.innerText = 'Failed to Submit Inquiry';
        btn.style.backgroundColor = '#d9534f';
        btn.style.color = 'white';
    })
    .finally(() => {
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.style.opacity = '1';
            btn.disabled = false;
        }, 3000);
    });
});

// About Section Tab Switching Logic
const tabButtons = document.querySelectorAll('.about-tabs .tab-btn');
const tabContents = document.querySelectorAll('.about-tabs .tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Deactivate all buttons and hide all contents
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Activate current button
        btn.classList.add('active');
        
        // Show current content
        const targetTab = btn.getAttribute('data-tab');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});
