// ================================
// GRACIAS.JS - THANK YOU PAGE LOGIC
// ================================

// Configuración de teléfonos
const PHONE_NUMBERS = {
    'guaymas': '6228558278',
    'guadalajara': '6221424577'
};

// ================================
// FUNCIÓN PARA MENSAJE WHATSAPP
// ================================
function getPersonalizedWhatsAppMessage(leadData) {
    const nombre = leadData.nombre || 'Cliente interesado';
    const ciudadDisplay = leadData.cityDisplay || leadData.city || 'mi ciudad';
    
    // Campaña camuflada para tracking
    let campaignInfo = '';
    const urlParams = leadData.urlParams || {};
    
    if (urlParams.utm_source || urlParams.utm_campaign) {
        const campaigns = {
            'facebook': 'FB',
            'google': 'GO', 
            'instagram': 'IG'
        };
        
        let refCode = campaigns[urlParams.utm_source?.toLowerCase()] || 'WEB';
        
        if (urlParams.utm_campaign) {
            refCode += `-${urlParams.utm_campaign.substring(0,3).toUpperCase()}`;
        }
        
        campaignInfo = `\n🔍 Ref: ${refCode}`;
    }

    return `Hola! Soy ${nombre} 👋

Acabo de completar el cuestionario en su página web y CALIFIQUÉ para el bioescáner.

📍 Ubicación: ${ciudadDisplay}
💰 Entiendo que la inversión es $449 MXN
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

⏰ Disponibilidad:
• Prefiero esta semana o la próxima
• Servicio a domicilio o punto de encuentro
• Pago en efectivo al momento de la sesión

¿Cuándo podríamos coordinar mi cita?${campaignInfo}

Muchas gracias!`;
}

// ================================
// FUNCIÓN PARA CONFIGURAR WHATSAPP
// ================================
function setupWhatsappButton() {
    const whatsappButton = document.getElementById('whatsappButton');
    if (!whatsappButton) return;

    // Obtener datos guardados del localStorage
    const leadData = JSON.parse(localStorage.getItem('leadData') || '{}');
    console.log('📊 Lead data from localStorage:', leadData);
    
    // Determinar teléfono según ciudad
    let phone = PHONE_NUMBERS['guadalajara']; // Default
    
    if (leadData.city) {
        phone = PHONE_NUMBERS[leadData.city.toLowerCase()] || PHONE_NUMBERS['guadalajara'];
    }
    
    // Actualizar UI con datos reales
    updatePageWithLeadData(leadData);

    // Configurar evento del botón
    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const message = getPersonalizedWhatsAppMessage(leadData);
        const url = `https://api.whatsapp.com/send?phone=521${phone}&text=${encodeURIComponent(message)}`;
        
        console.log('📱 WhatsApp data:', {
            nombre: leadData.nombre,
            city: leadData.city,
            cityDisplay: leadData.cityDisplay,
            phone: phone,
            urlParams: leadData.urlParams
        });
        
        window.open(url, '_blank', 'noopener');
        
        // Track conversion si hay analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'city': leadData.city,
                'campaign': leadData.urlParams?.utm_campaign || 'direct',
                'qualified': 'yes'
            });
        }
    });
}

// ================================
// FUNCIÓN PARA ACTUALIZAR UI
// ================================
function updatePageWithLeadData(leadData) {
    // Actualizar ciudad en el texto
    const userCityElement = document.getElementById('user-city');
    if (userCityElement && leadData.cityDisplay) {
        userCityElement.textContent = leadData.cityDisplay;
    }

    // Si no hay datos, mostrar alerta para debug
    if (!leadData.nombre || !leadData.city) {
        console.warn('⚠️ Datos incompletos en localStorage:', leadData);
        
        // Opcional: Mostrar mensaje de error o redirigir
        if (!leadData.qualified) {
            console.log('❌ Usuario no calificado, redirigiendo...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    }
}

// ================================
// FUNCIÓN PARA MOSTRAR DATOS DEBUG
// ================================
function showDebugInfo() {
    const leadData = JSON.parse(localStorage.getItem('leadData') || '{}');
    console.log('🔍 Debug Info:');
    console.log('Lead Data:', leadData);
    console.log('URL Params:', leadData.urlParams);
    console.log('Qualified:', leadData.qualified);
    console.log('City:', leadData.city);
    console.log('City Display:', leadData.cityDisplay);
    console.log('Nombre:', leadData.nombre);
    console.log('WhatsApp:', leadData.whatsapp);
}

// ================================
// INICIALIZACIÓN
// ================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Gracias page loaded');
    
    // Configurar WhatsApp button
    setupWhatsappButton();
    
    // Mostrar debug info en consola
    showDebugInfo();
});

// Funciones globales para debug manual
window.showDebugInfo = showDebugInfo;
window.leadData = () => JSON.parse(localStorage.getItem('leadData') || '{}');