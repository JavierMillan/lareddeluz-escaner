// ================================
// GRACIAS.JS REFACTORIZADO - FUNCIONES ESPECIALIZADAS
// ================================

// ================================
// 1. CONFIGURACIÓN Y CONSTANTES
// ================================
const CONFIG = {
    phones: {
        'guaymas': '6228558278',
        'guadalajara': '6221424577'
    },
    fallbacks: {
        defaultPhone: '6221424577',
        defaultCity: 'Guadalajara'
    }
};

// ================================
// 2. GESTIÓN DE DATOS
// ================================
function getLeadData() {
    try {
        return JSON.parse(localStorage.getItem('leadData') || '{}');
    } catch (error) {
        console.error('❌ Error reading lead data:', error);
        return {};
    }
}

function validateLeadData(leadData) {
    const validation = {
        hasBasicData: !!(leadData.nombre && leadData.whatsapp),
        isQualified: leadData.qualified === true,
        hasQuizData: !!(leadData.city_confirmation && leadData.symptoms),
        hasCity: !!(leadData.city || leadData.cityDisplay),
        errors: []
    };
    
    if (!validation.hasBasicData) {
        validation.errors.push('Faltan datos básicos (nombre/whatsapp)');
    }
    
    if (!validation.isQualified) {
        validation.errors.push('Usuario no calificado');
    }
    
    if (!validation.hasQuizData) {
        validation.errors.push('Faltan respuestas del quiz');
    }
    
    return validation;
}

// ================================
// 3. CONSTRUCCIÓN DEL MENSAJE WHATSAPP
// ================================
function extractQuizResponses(leadData) {
    const responses = [];
    
    const quizKeys = [
        'city_confirmation',
        'symptoms', 
        'medical_studies',
        'frustration',
        'understanding'
    ];
    
    quizKeys.forEach(key => {
        if (leadData[key]?.whatsappText) {
            responses.push(leadData[key].whatsappText);
        }
    });
    
    console.log('📝 Quiz responses extracted:', responses);
    return responses;
}

function extractPreferences(leadData) {
    const preferences = [];
    
    const preferenceKeys = [
        'availability',
        'service_location', 
        'payment_method'
    ];
    
    preferenceKeys.forEach(key => {
        if (leadData[key]?.whatsappText) {
            preferences.push(leadData[key].whatsappText);
        }
    });
    
    console.log('⏰ Preferences extracted:', preferences);
    return preferences;
}

function generateWhatISeek(leadData) {
    const goals = [];
    
    // Generate dynamically based on qualifying quiz responses
    if (leadData.symptoms?.qualifying) {
        goals.push("Respuestas específicas en lugar de 'todo está normal'");
    }
    
    if (leadData.medical_studies?.qualifying) {
        goals.push("Información que mis estudios médicos anteriores no me dieron");
    }
    
    if (leadData.understanding?.qualifying) {
        goals.push("Un panorama integral de mis 45 parámetros de salud");
    }
    
    if (leadData.frustration?.qualifying) {
        goals.push("Plan de acción basado en información real y útil");
    }
    
    // Fallback for legacy data or incomplete responses
    if (goals.length === 0) {
        goals.push("Respuestas específicas sobre mi bienestar");
        goals.push("Un panorama integral de mi salud");
        goals.push("Plan de acción personalizado");
    }
    
    console.log('🎯 Goals generated:', goals);
    return goals;
}

function generateTrackingInfo(leadData) {
    const urlParams = leadData.urlParams || {};
    
    if (!urlParams.utm_source && !urlParams.utm_campaign) {
        return '';
    }
    
    const campaignMap = {
        'facebook': 'FB',
        'google': 'GO', 
        'instagram': 'IG'
    };
    
    let refCode = campaignMap[urlParams.utm_source?.toLowerCase()] || 'WEB';
    
    if (urlParams.utm_campaign) {
        refCode += `-${urlParams.utm_campaign.substring(0,3).toUpperCase()}`;
    }
    
    return `\n🔍 Ref: ${refCode}`;
}

function buildWhatsAppMessage(leadData) {
    const nombre = leadData.nombre || 'Cliente interesado';
    
    const quizResponses = extractQuizResponses(leadData);
    const preferences = extractPreferences(leadData);
    const goals = generateWhatISeek(leadData);
    const trackingInfo = generateTrackingInfo(leadData);
    
    // Validate we have minimum required data
    if (quizResponses.length === 0) {
        console.warn('⚠️ No quiz responses found, using fallback message');
        return buildFallbackMessage(leadData);
    }
    
    const message = `Hola! Soy ${nombre} 👋

Acabo de completar el cuestionario en su página web y CALIFIQUÉ para el bioescáner.

🎯 Mi situación específica:
${quizResponses.map(text => `• ${text}`).join('\n')}

❓ Lo que busco con el bioescáner:
${goals.map(text => `• ${text}`).join('\n')}

⏰ Disponibilidad y preferencias:
${preferences.map(text => `• ${text}`).join('\n')}

¿Cuándo podríamos coordinar mi cita?${trackingInfo}

Muchas gracias!`;

    console.log('📱 Dynamic message built successfully');
    return message;
}

function buildFallbackMessage(leadData) {
    const nombre = leadData.nombre || 'Cliente interesado';
    const ciudadDisplay = leadData.cityDisplay || leadData.city || 'mi ciudad';
    const trackingInfo = generateTrackingInfo(leadData);

    console.log('📱 Using fallback message template');
    
    return `Hola! Soy ${nombre} 👋

Acabo de completar el cuestionario en su página web y CALIFIQUÉ para el bioescáner.

📍 Ubicación: ${ciudadDisplay}
💰 Inversión: $499 MXN
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

¿Cuándo podríamos coordinar mi cita?${trackingInfo}

Muchas gracias!`;
}

// ================================
// 4. DETERMINACIÓN DE TELÉFONO
// ================================
function determinePhoneNumber(leadData) {
    // Priority: lead data city -> fallback
    const city = leadData.city?.toLowerCase();
    
    if (city && CONFIG.phones[city]) {
        console.log(`📞 Phone determined from city: ${city} -> ${CONFIG.phones[city]}`);
        return CONFIG.phones[city];
    }
    
    console.log(`📞 Using fallback phone: ${CONFIG.fallbacks.defaultPhone}`);
    return CONFIG.fallbacks.defaultPhone;
}

// ================================
// 5. ACTUALIZACIÓN DE UI
// ================================
function updatePageUI(leadData) {
    updateCityDisplay(leadData);
    updateDebugInfo(leadData);
}

function updateCityDisplay(leadData) {
    const userCityElement = document.getElementById('user-city');
    
    if (userCityElement) {
        const cityDisplay = leadData.cityDisplay || leadData.city || CONFIG.fallbacks.defaultCity;
        userCityElement.textContent = cityDisplay;
        console.log(`🏙️ City display updated: ${cityDisplay}`);
    }
}

function updateDebugInfo(leadData) {
    if (!leadData.nombre || !leadData.city) {
        console.warn('⚠️ Incomplete lead data detected:', {
            hasNombre: !!leadData.nombre,
            hasCity: !!leadData.city,
            hasQuizData: !!leadData.city_confirmation,
            qualified: leadData.qualified
        });
        
        if (!leadData.qualified) {
            console.log('❌ User not qualified, will redirect...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    }
}

// ================================
// 6. MANEJO DE WHATSAPP
// ================================
function createWhatsAppURL(phone, message) {
    const encodedMessage = encodeURIComponent(message);
    return `https://api.whatsapp.com/send?phone=521${phone}&text=${encodedMessage}`;
}

function handleWhatsAppClick(leadData) {
    const validation = validateLeadData(leadData);
    
    if (!validation.isQualified) {
        console.error('❌ Invalid lead data for WhatsApp:', validation.errors);
        alert('Error: Datos de usuario no válidos. Por favor completa el proceso nuevamente.');
        window.location.href = 'index.html';
        return;
    }
    
    const phone = determinePhoneNumber(leadData);
    const message = buildWhatsAppMessage(leadData);
    const url = createWhatsAppURL(phone, message);
    
    // Log for analytics
    console.log('📱 WhatsApp click data:', {
        nombre: leadData.nombre,
        city: leadData.city,
        phone: phone,
        hasQuizData: !!leadData.city_confirmation,
        hasPreferences: !!(leadData.service_location && leadData.payment_method)
    });
    
    // Track conversion if analytics available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            'city': leadData.city,
            'campaign': leadData.urlParams?.utm_campaign || 'direct',
            'qualified': 'yes'
        });
    }
    
    // Open WhatsApp
    window.open(url, '_blank', 'noopener');
}

// ================================
// 7. CONFIGURACIÓN DE EVENTOS
// ================================
function setupWhatsAppButton() {
    const whatsappButton = document.getElementById('whatsappButton');
    if (!whatsappButton) {
        console.warn('⚠️ WhatsApp button not found');
        return;
    }

    const leadData = getLeadData();
    console.log('📊 Lead data loaded:', leadData);
    
    // Update page with lead data
    updatePageUI(leadData);

    // Configure button click handler
    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        handleWhatsAppClick(leadData);
    });
    
    console.log('✅ WhatsApp button configured successfully');
}

// ================================
// 8. FUNCIONES DE DEBUG Y TESTING
// ================================
function showDebugInfo() {
    const leadData = getLeadData();
    const validation = validateLeadData(leadData);
    const phone = determinePhoneNumber(leadData);
    const message = buildWhatsAppMessage(leadData);
    
    console.log('🔍 === DEBUG INFO ===');
    console.log('Lead Data:', leadData);
    console.log('Validation:', validation);
    console.log('Phone:', phone);
    console.log('Quiz Responses:', extractQuizResponses(leadData));
    console.log('Preferences:', extractPreferences(leadData));
    console.log('Goals:', generateWhatISeek(leadData));
    console.log('WhatsApp Message Preview:');
    console.log(message);
    console.log('===================');
    
    return {
        leadData,
        validation,
        phone,
        message,
        quizResponses: extractQuizResponses(leadData),
        preferences: extractPreferences(leadData),
        goals: generateWhatISeek(leadData)
    };
}

function testWhatsAppMessage() {
    const leadData = getLeadData();
    const message = buildWhatsAppMessage(leadData);
    
    console.log('🧪 Testing WhatsApp message generation:');
    console.log('Input data:', leadData);
    console.log('Generated message:');
    console.log(message);
    
    return { leadData, message };
}

function simulateWhatsAppClick() {
    const leadData = getLeadData();
    console.log('🎭 Simulating WhatsApp click...');
    handleWhatsAppClick(leadData);
}

// ================================
// 9. MANEJO DE ERRORES
// ================================
function handleDataError(error, context) {
    console.error(`❌ Error in ${context}:`, error);
    
    // Could implement error reporting here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': `${context}: ${error.message}`,
            'fatal': false
        });
    }
}

// ================================
// 10. INICIALIZACIÓN
// ================================
function initializeGraciasPage() {
    console.log('🚀 Gracias page initialized');
    
    try {
        setupWhatsAppButton();
        showDebugInfo();
    } catch (error) {
        handleDataError(error, 'page_initialization');
    }
}

// ================================
// 11. EVENT LISTENERS
// ================================
document.addEventListener('DOMContentLoaded', initializeGraciasPage);

// ================================
// 12. FUNCIONES GLOBALES PARA DEBUG
// ================================
window.showDebugInfo = showDebugInfo;
window.testWhatsAppMessage = testWhatsAppMessage;
window.simulateWhatsAppClick = simulateWhatsAppClick;
window.getLeadData = getLeadData;
window.buildWhatsAppMessage = buildWhatsAppMessage;