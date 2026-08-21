// NAVBAR TOGGLE
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link =>
    link.addEventListener('click', (e) => {
        e.preventDefault();

        hamburger.classList.remove('active');
        navMenu.classList.remove('active');

        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        // remove the #hash from the URL instead of pushing it
        history.replaceState(null, '', window.location.pathname + window.location.search);
    })
);

// ACTIVE LINK ON SCROLL
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// TYPING EFFECT
const typedText = document.querySelector('.typed-text');
const words = ['Software Developer', 'Python Developer', 'Problem Solver'];
let wordIndex = 0, charIndex = 0;

function type() {
    if (charIndex < words[wordIndex].length) {
        typedText.textContent += words[wordIndex][charIndex++];
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typedText.textContent = words[wordIndex].slice(0, --charIndex);
        setTimeout(erase, 50);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    }
}

document.addEventListener('DOMContentLoaded', type);

// FADE-IN
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

// BACK TO TOP
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 300);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.querySelector('.logo-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', window.location.pathname + window.location.search);
});

// ANY OTHER IN-PAGE ANCHOR LINKS (e.g. hero "Get In Touch" button)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (link.classList.contains('nav-link') || link.classList.contains('logo-link')) return;
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({ behavior: 'smooth' });
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    });
});
