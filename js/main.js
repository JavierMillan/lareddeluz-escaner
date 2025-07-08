// Spinner animación para el formulario
const style = document.createElement('style');
style.innerHTML = `@keyframes spin { 0%{transform:rotate(0deg);} 100%{transform:rotate(360deg);} }`;
document.head.appendChild(style);

// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Scroll suave para navegación interna
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

// --- FORMULARIO PRINCIPAL ---
const leadForm = document.getElementById('leadForm');
if (leadForm) {
    console.log('Lead form found'); // Debug

    // Handler para cambios en el dropdown de ciudad
    const ciudadSelect = document.getElementById('ciudad');
    const otraCiudadGroup = document.getElementById('otra-ciudad-group');
    const otraCiudadInput = document.getElementById('otra-ciudad');
    const errorOtraCiudad = document.getElementById('error-otra-ciudad');

    if (ciudadSelect) {
        ciudadSelect.addEventListener('change', function() {
            if (this.value === 'otra') {
                otraCiudadGroup.style.display = 'block';
                otraCiudadInput.required = true;
            } else {
                otraCiudadGroup.style.display = 'none';
                otraCiudadInput.required = false;
                otraCiudadInput.value = '';
                if (errorOtraCiudad) errorOtraCiudad.classList.remove('active');
            }
        });
    }

    // Validación y submit del formulario
    leadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted'); // Debug

        const nombre = document.getElementById('nombre');
        const ciudad = document.getElementById('ciudad');
        const otraCiudad = document.getElementById('otra-ciudad');
        const errorNombre = document.getElementById('error-nombre');
        const errorCiudad = document.getElementById('error-ciudad');
        const errorOtraCiudad = document.getElementById('error-otra-ciudad');
        
        let valid = true;        
        
        // Reset feedback
        [nombre, ciudad, otraCiudad].forEach(input => {
            if (input) input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
        [errorNombre, errorCiudad, errorOtraCiudad].forEach(error => {
            if (error) error.classList.remove('active');
        });

        // Validación del nombre
        if (!nombre?.value.trim() || nombre.value.trim().length < 5) {
            nombre.style.borderColor = '#dc3545';
            if (errorNombre) errorNombre.classList.add('active');
            valid = false;
        }

        // Validación de ciudad
        if (!ciudad?.value.trim()) {
            ciudad.style.borderColor = '#dc3545';
            if (errorCiudad) errorCiudad.classList.add('active');
            valid = false;
        }

        // Validación de otra ciudad cuando corresponda
        if (ciudad?.value === 'otra') {
            if (!otraCiudad?.value.trim()) {
                otraCiudad.style.borderColor = '#dc3545';
                if (errorOtraCiudad) errorOtraCiudad.classList.add('active');
                valid = false;
            }
        }

        if (!valid) return;

        // Loading state
        const submitBtn = leadForm.querySelector('.btn-submit');
        const btnText = submitBtn?.querySelector('.btn-text');
        const loading = submitBtn?.querySelector('.loading');
        
        if (submitBtn && btnText && loading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            loading.style.display = 'inline-block';
            loading.innerHTML = '<span style="display:inline-block;width:1.2em;height:1.2em;border:2px solid #e4cd85;border-top:2px solid transparent;border-radius:50%;animation:spin 0.7s linear infinite;vertical-align:middle;"></span>';
        }

        // Save data
        const formData = {
            nombre: nombre?.value.trim() || '',
            ciudad: ciudad?.value.trim() || '',
            otraCiudad: ciudad?.value === 'otra' ? otraCiudad?.value.trim() : ''
        };
        localStorage.setItem('leadData', JSON.stringify(formData));

        // Redirect to thank you page
        setTimeout(() => {
            window.location.href = 'gracias.html';
        }, 1200);
    });
}

// Parallax sutil en hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const scrolled = window.scrollY;
    hero.style.backgroundPosition = `center ${scrolled * 0.2}px`;
});

// Animación de cuenta regresiva para la promo
const promoTimer = document.getElementById('promo-timer');
if (promoTimer) {
    const now = new Date();
    let end = localStorage.getItem('promoEnd');
    if (!end) {
        end = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
        localStorage.setItem('promoEnd', end);
    }
    
    function updatePromoTimer() {
        const endTime = new Date(localStorage.getItem('promoEnd'));
        const diff = endTime - new Date();
        if (diff > 0) {
            const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
            const mins = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const secs = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
            promoTimer.textContent = `${hours}:${mins}:${secs}`;
        } else {
            promoTimer.textContent = '00:00:00';
        }
    }
    
    updatePromoTimer();
    setInterval(updatePromoTimer, 1000);
}

// WhatsApp functionality for thank you page
function setupWhatsappButton() {
    const whatsappButton = document.getElementById('whatsappButton');
    if (!whatsappButton) return;
    const leadData = JSON.parse(localStorage.getItem('leadData') || '{}');
    let phone = '6221424577'; // Default (Other)
    // Guaymas
    if (
        (leadData.ciudad && leadData.ciudad.trim().toLowerCase() === 'guaymas') ||
        (leadData.otraCiudad && leadData.otraCiudad.trim().toLowerCase() === 'guaymas')
    ) {
        phone = '6228558278';
    }
    // Guadalajara
    else if (
        (leadData.ciudad && leadData.ciudad.trim().toLowerCase() === 'guadalajara') ||
        (leadData.otraCiudad && leadData.otraCiudad.trim().toLowerCase() === 'guadalajara')
    ) {
        phone = '6221424577'; // Cambia este número si es necesario
    }
    const nombre = leadData.nombre ? leadData.nombre.trim() : '';
    let message = `Hola, soy ${nombre} 👋 me interesa hacerme el bioescáner eléctrico. Últimamente he sentido algunas molestias o cambios en mi cuerpo y quiero entender mejor qué está pasando. ¿Me puedes dar más información para agendar una cita, por favor?`;
    if (leadData.ciudad === 'otra' && leadData.otraCiudad) {
        message += `\nCiudad: ${leadData.otraCiudad}`;
    }
    const url = `https://api.whatsapp.com/send?phone=521${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
}

document.addEventListener('DOMContentLoaded', () => {
    const whatsappButton = document.getElementById('whatsappButton');
    if (whatsappButton) {
        whatsappButton.onclick = function(e) {
            e.preventDefault();
            setupWhatsappButton();
        };
    }
    // FAQ accordion toggle
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            item.classList.toggle('active');
        });
    });
    window.setupWhatsappButton = setupWhatsappButton;
});
