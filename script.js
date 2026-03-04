// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================
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

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 20px;
    background-color: #003366;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0, 51, 102, 0.6);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.alignItems = 'center';
        scrollTopBtn.style.justifyContent = 'center';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseover', () => {
    scrollTopBtn.style.backgroundColor = '#002244';
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseout', () => {
    scrollTopBtn.style.backgroundColor = '#003366';
    scrollTopBtn.style.transform = 'scale(1)';
});

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATION
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section, header').forEach(section => {
    section.classList.add('fade-in-element');
    observer.observe(section);
});

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        left: ${x}px;
        top: ${y}px;
        animation: ripple-animation 0.6s ease-out;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.dataset.animated !== 'true') {
            const target = parseInt(entry.target.dataset.target) || 0;
            if (target > 0) {
                animateCounter(entry.target, target);
                entry.target.dataset.animated = 'true';
            }
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-target]').forEach(el => {
    counterObserver.observe(el);
});

// ============================================
// ENHANCED FAQ ACCORDION
// ============================================
document.querySelectorAll('.faq-input').forEach((checkbox, index) => {
    // Close other FAQs when one opens
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            document.querySelectorAll('.faq-input').forEach((other, otherIndex) => {
                if (otherIndex !== index) {
                    other.checked = false;
                }
            });
        }
    });
});

// ============================================
// FLOATING BUTTON ANIMATION
// ============================================
const floatBtn = document.querySelector('.float-btn');
if (floatBtn) {
    floatBtn.style.transition = 'all 0.3s ease';
    
    floatBtn.addEventListener('mouseenter', () => {
        floatBtn.style.transform = 'translateY(-5px) scale(1.05)';
        floatBtn.style.boxShadow = '0 6px 20px rgba(0, 51, 102, 0.8)';
    });
    
    floatBtn.addEventListener('mouseleave', () => {
        floatBtn.style.transform = 'translateY(0) scale(1)';
        floatBtn.style.boxShadow = '0 4px 15px rgba(0, 51, 102, 0.6)';
    });

    // Pulse animation
    floatBtn.style.animation = 'float-pulse 2s infinite';
}

// ============================================
// LAZY LOAD IMAGES
// ============================================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            if (!img.src) {
                img.src = img.dataset.src;
            }
            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// PRICE BOX ANIMATION
// ============================================
const priceBox = document.querySelector('.premium-price-box');
if (priceBox) {
    priceBox.style.transition = 'all 0.3s ease';
    
    priceBox.addEventListener('mouseenter', () => {
        priceBox.style.transform = 'translateY(-5px)';
        priceBox.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    
    priceBox.addEventListener('mouseleave', () => {
        priceBox.style.transform = 'translateY(0)';
        priceBox.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    });
}

// ============================================
// BUTTON CLICK LOADING STATE
// ============================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const originalText = this.textContent;
        this.textContent = '⏳ Memproses...';
        this.disabled = true;
        
        // Re-enable after 1 second (adjust as needed)
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 1000);
    });
});

// ============================================
// ADD CSS ANIMATIONS VIA STYLESHEET
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in-element {
        opacity: 0;
    }

    .fade-in {
        animation: fade-in 0.8s ease-out forwards;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes float-pulse {
        0%, 100% {
            box-shadow: 0 4px 15px rgba(0, 51, 102, 0.6);
        }
        50% {
            box-shadow: 0 4px 25px rgba(0, 51, 102, 0.9);
        }
    }

    @keyframes slide-in-up {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .slide-in-up {
        animation: slide-in-up 0.6s ease-out;
    }

    /* Enhanced button states */
    .btn {
        position: relative;
        overflow: hidden;
    }

    .btn:active {
        transform: translateY(-1px);
    }

    /* Smooth transitions */
    * {
        scroll-behavior: smooth;
    }

    /* Enhanced card hover */
    .card {
        transition: all 0.3s ease;
    }

    .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    /* FAQ smooth height */
    .faq-answer {
        transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// ============================================
// CONSOLE LOG - INITIALIZATION COMPLETE
// ============================================
console.log('✨ Script loaded successfully! All animations are active.');