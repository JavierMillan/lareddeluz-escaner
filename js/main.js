// Intersection Observer for animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.benefit-card, .hero__title, .hero__text').forEach(el => {
        observer.observe(el);
    });
};

// Form handling
const handleForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Store data in sessionStorage for thank you page
        sessionStorage.setItem('formData', JSON.stringify(data));

        // Redirect to thank you page
        window.location.href = 'gracias.html';
    });
};

// WhatsApp link generation
const generateWhatsAppLink = (phoneNumber, message) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

// Form validation
const validateForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            input.classList.add('error');
        });

        input.addEventListener('input', () => {
            if (input.validity.valid) {
                input.classList.remove('error');
            }
        });
    });
};

// Phone number formatting
const formatPhoneNumber = () => {
    const phoneInput = document.getElementById('whatsapp');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        e.target.value = value;
    });
};

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    handleForm();
    validateForm();
    formatPhoneNumber();
});
