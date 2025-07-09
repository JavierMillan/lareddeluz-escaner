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

// ================================
// WHATSAPP FUNCTIONALITY MEJORADA
// ================================

function getPersonalizedWhatsAppMessage(leadData) {
    const nombre = leadData.nombre ? leadData.nombre.trim() : 'Cliente interesado';
    
    // Detectar ciudad
    let ciudad = 'mi ciudad';
    if (leadData.ciudad) {
        switch(leadData.ciudad.toLowerCase()) {
            case 'guaymas':
                ciudad = 'Guaymas, Sonora';
                break;
            case 'guadalajara':
                ciudad = 'Guadalajara, Jalisco';
                break;
            case 'otra':
                ciudad = leadData.otraCiudad ? leadData.otraCiudad.trim() : 'otra ciudad';
                break;
            default:
                ciudad = leadData.ciudad;
        }
    }

    // Mensaje completo con información correcta
    let message = `Hola! Soy ${nombre} 👋

Acabo de completar el cuestionario en su página web y CALIFIQUÉ para el bioescáner.

📍 Ubicación: ${ciudad}
💰 Entiendo que la inversión es $499 MXN
⏰ Duración: 45-50 minutos

🎯 Mi situación específica:
• Tengo síntomas persistentes que me preocupan
• He hecho estudios médicos que no me dan respuestas claras
• Estoy cansado/a de perder tiempo y dinero sin información útil
• Necesito entender QUÉ le pasa realmente a mi cuerpo

❓ Lo que busco con el bioescáner:
• Respuestas específicas en lugar de "todo está normal"
• Un panorama integral de mis 45 parámetros de salud
• Plan de acción basado en información real
• Alguien que realmente entienda mi frustración

⏰ Disponibilidad:
• Prefiero esta semana o la próxima
• Servicio a domicilio o punto de encuentro
• Pago en efectivo al momento de la sesión (sin anticipos)

¿Cuándo podríamos coordinar mi cita?

Muchas gracias!`;

    return message;
}

function setupWhatsappButtonImproved() {
    const whatsappButton = document.getElementById('whatsappButton');
    if (!whatsappButton) return;
    
    const leadData = JSON.parse(localStorage.getItem('leadData') || '{}');
    
    // Determinar teléfono según ciudad
    let phone = '6221424577'; // Default Guadalajara
    
    const ciudadLower = (leadData.ciudad || '').toLowerCase();
    const otraCiudadLower = (leadData.otraCiudad || '').toLowerCase();
    
    if (ciudadLower === 'guaymas' || otraCiudadLower.includes('guaymas')) {
        phone = '6228558278'; // Guaymas
    }

    const message = getPersonalizedWhatsAppMessage(leadData);
    const url = `https://api.whatsapp.com/send?phone=521${phone}&text=${encodeURIComponent(message)}`;
    
    // Tracking básico
    console.log('WhatsApp message sent:', {
        nombre: leadData.nombre,
        ciudad: leadData.ciudad,
        phone: phone,
        timestamp: new Date().toISOString()
    });
    
    window.open(url, '_blank', 'noopener');
}

// ================================
// INICIALIZACIÓN
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Configurar botón WhatsApp
    const whatsappButton = document.getElementById('whatsappButton');
    if (whatsappButton) {
        whatsappButton.onclick = function(e) {
            e.preventDefault();
            setupWhatsappButtonImproved();
        };
    }

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const answer = item.querySelector('.faq-answer');
            const icon = btn.querySelector('.faq-icon');
            const wasActive = item.classList.contains('active');

            // Cerrar todos los otros items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-icon');
                if (otherAnswer) otherAnswer.style.display = 'none';
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            });

            // Toggle el item actual
            if (!wasActive) {
                item.classList.add('active');
                if (answer) answer.style.display = 'block';
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});

// Exportar funciones para uso global
window.setupWhatsappButtonImproved = setupWhatsappButtonImproved;
window.getPersonalizedWhatsAppMessage = getPersonalizedWhatsAppMessage;