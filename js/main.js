// ================================
// MAIN.JS REFACTORIZADO - CÓDIGO CORREGIDO
// ================================

// ================================
// 1. CONFIGURACIÓN Y CONSTANTES
// ================================
const CONFIG = {
    cities: {
        available: ['guaymas', 'guadalajara'],
        phones: {
            'guaymas': '6228558278',
            'guadalajara': '6221424577'
        }
    }
};

// ================================
// 2. UTILIDADES DE URL Y PARÁMETROS
// ================================
function extractURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        ciudad: urlParams.get('ciudad'),
        utm_source: urlParams.get('utm_source'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_medium: urlParams.get('utm_medium'),
        fbclid: urlParams.get('fbclid'),
        gclid: urlParams.get('gclid')
    };
}

function validateCityAccess() {
    const params = extractURLParams();
    const ciudad = params.ciudad;
    
    if (!ciudad) {
        return { valid: false, reason: 'no_city_param' };
    }
    
    const ciudadNormalized = ciudad.toLowerCase().trim();
    const isAvailable = CONFIG.cities.available.includes(ciudadNormalized);
    
    return {
        valid: isAvailable,
        city: ciudadNormalized,
        cityDisplay: ciudad,
        reason: isAvailable ? null : 'city_not_available'
    };
}

// ================================
// 3. GESTIÓN DE DATOS (LocalStorage)
// ================================
function saveLeadData(data) {
    try {
        localStorage.setItem('leadData', JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving lead data:', error);
        return false;
    }
}

function storeNonQualifiedLead(reason, cityData, quizData = {}) {
    try {
        let nonQualifiedLeads = JSON.parse(localStorage.getItem('nonQualifiedLeads') || '[]');
        
        const newLead = {
            reason,
            city: cityData?.city,
            cityDisplay: cityData?.cityDisplay,
            quizAnswers: quizData,
            urlParams: extractURLParams(),
            timestamp: new Date().toISOString(),
            id: Date.now() + Math.random().toString(36).substr(2, 9)
        };
        
        nonQualifiedLeads.push(newLead);
        
        if (nonQualifiedLeads.length > 100) {
            nonQualifiedLeads = nonQualifiedLeads.slice(-100);
        }
        
        localStorage.setItem('nonQualifiedLeads', JSON.stringify(nonQualifiedLeads));
        return true;
    } catch (error) {
        console.error('Error storing non-qualified lead:', error);
        return false;
    }
}

// ================================
// 4. CONFIGURACIÓN DEL QUIZ
// ================================
function getQuizConfiguration(cityValidation) {
    return {
        questions: [
            {
                id: 'city_confirmation',
                question: `¿Te encuentras actualmente en ${cityValidation.cityDisplay}?`,
                options: [
                    {
                        id: 'si',
                        text: `Sí, estoy en ${cityValidation.cityDisplay} ✓`,
                        whatsappText: `Ubicación confirmada: ${cityValidation.cityDisplay}`,
                        qualifying: true,
                        data: { city: cityValidation.city, phone: CONFIG.cities.phones[cityValidation.city] }
                    },
                    {
                        id: 'no',
                        text: "No, estoy en otra ciudad",
                        whatsappText: "Ubicación: Otra ciudad", 
                        qualifying: false
                    }
                ]
            },
            {
                id: 'symptoms',
                question: "¿Tienes síntomas persistentes que te preocupan?",
                options: [
                    {
                        id: 'sin-sintomas',
                        text: "No, me siento bien en general",
                        whatsappText: "Síntomas: No tengo síntomas preocupantes",
                        qualifying: false
                    },
                    {
                        id: 'sintomas-leves', 
                        text: "Tengo algunas molestias ocasionales",
                        whatsappText: "Síntomas: Molestias ocasionales",
                        qualifying: false
                    },
                    {
                        id: 'sintomas-persistentes',
                        text: "Sí, tengo síntomas persistentes que me preocupan ✓",
                        whatsappText: "Tengo síntomas persistentes que me preocupan",
                        qualifying: true
                    }
                ]
            },
            {
                id: 'medical_studies',
                question: "¿Has hecho estudios médicos que no te dan respuestas claras?",
                options: [
                    {
                        id: 'no-estudios',
                        text: "No he hecho estudios médicos",
                        whatsappText: "Estudios médicos: No he realizado estudios",
                        qualifying: false
                    },
                    {
                        id: 'estudios-claros',
                        text: "Sí, pero obtuve respuestas satisfactorias",
                        whatsappText: "Estudios médicos: Obtuve respuestas satisfactorias",
                        qualifying: false
                    },
                    {
                        id: 'estudios-sin-respuestas',
                        text: "Sí, he hecho estudios pero no obtuve respuestas claras ✓",
                        whatsappText: "He hecho estudios médicos que no me dan respuestas claras",
                        qualifying: true
                    }
                ]
            },
            {
                id: 'frustration',
                question: "¿Estás cansado/a de perder tiempo y dinero sin información útil?",
                options: [
                    {
                        id: 'no-frustrado',
                        text: "No, estoy satisfecho con mi proceso actual",
                        whatsappText: "Frustración: Satisfecho con mi proceso actual",
                        qualifying: false
                    },
                    {
                        id: 'algo-frustrado',
                        text: "Un poco, pero no es urgente para mí",
                        whatsappText: "Frustración: Algo frustrado pero no urgente",
                        qualifying: false
                    },
                    {
                        id: 'muy-frustrado',
                        text: "Sí, estoy cansado/a de perder tiempo y dinero sin resultados ✓",
                        whatsappText: "Estoy cansado/a de perder tiempo y dinero sin información útil",
                        qualifying: true
                    }
                ]
            },
            {
                id: 'understanding',
                question: "¿Necesitas entender QUÉ le pasa realmente a tu cuerpo?",
                options: [
                    {
                        id: 'no-necesito',
                        text: "No, ya tengo claridad sobre mi salud",
                        whatsappText: "Comprensión: Ya tengo claridad sobre mi salud",
                        qualifying: false
                    },
                    {
                        id: 'algo-curioso',
                        text: "Me da curiosidad, pero no es prioritario",
                        whatsappText: "Comprensión: Curiosidad, pero no prioritario",
                        qualifying: false
                    },
                    {
                        id: 'necesito-entender',
                        text: "Sí, necesito entender QUÉ le pasa realmente a mi cuerpo ✓",
                        whatsappText: "Necesito entender QUÉ le pasa realmente a mi cuerpo",
                        qualifying: true
                    }
                ]
            },
            {
                id: 'availability',
                question: "¿Cuándo prefieres tu sesión de bioescáner?",
                options: [
                    {
                        id: 'esta-semana',
                        text: "Esta semana ✓",
                        whatsappText: "Prefiero esta semana",
                        qualifying: true,
                        data: { urgency: 'high' }
                    },
                    {
                        id: 'proxima-semana',
                        text: "La próxima semana ✓",
                        whatsappText: "Prefiero la próxima semana",
                        qualifying: true,
                        data: { urgency: 'medium' }
                    },
                    {
                        id: 'flexible',
                        text: "Soy flexible con las fechas ✓",
                        whatsappText: "Soy flexible con las fechas",
                        qualifying: true,
                        data: { urgency: 'low' }
                    },
                    {
                        id: 'mas-adelante',
                        text: "Prefiero en unas semanas o meses",
                        whatsappText: "Prefiero en unas semanas o meses",
                        qualifying: false,
                        data: { urgency: 'very_low' }
                    }
                ]
            }
        ]
    };
}

// ================================
// 5. RENDERIZADO DE UI
// ================================
function renderQuizQuestion(question, questionIndex, totalQuestions) {
    const progress = ((questionIndex + 1) / totalQuestions) * 100;
    
    return `
        <div class="max-w-3xl mx-auto">
            <h2 class="text-3xl font-bold text-center mb-8 text-white">¿Calificas para el bioescáner?</h2>
            <p class="text-center text-white/80 mb-12">${totalQuestions} preguntas rápidas:</p>

            <div class="mb-8">
                <div class="flex justify-between text-sm text-white/70 mb-2">
                    <span>Pregunta ${questionIndex + 1} de ${totalQuestions}</span>
                    <span>${Math.round(progress)}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                    <div class="bg-gradient-to-r from-gold-light to-gold-dark h-2 rounded-full transition-all duration-500"
                         style="width: ${progress}%"></div>
                </div>
            </div>

            <div class="glass rounded-xl p-6 mb-6">
                <h3 class="text-xl font-bold mb-4 text-gold-light">
                    ${questionIndex + 1}. ${question.question}
                </h3>
                <div class="space-y-3" id="quiz-options">
                    ${question.options.map((option, index) => `
                        <button onclick="handleQuizAnswer('${question.id}', '${option.id}', ${index})"
                                class="quiz-option w-full flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-200 text-left border border-transparent hover:border-gold-light/30">
                            <div class="w-5 h-5 rounded-full border-2 border-white/30 mr-3 flex items-center justify-center">
                                <div class="w-2 h-2 bg-transparent rounded-full transition-all duration-200"></div>
                            </div>
                            <span class="text-white">${option.text}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            ${questionIndex > 0 ? `
                <div class="text-center">
                    <button onclick="previousQuizQuestion()" 
                            class="text-white/70 hover:text-white flex items-center mx-auto">
                        ← Regresar
                    </button>
                </div>
            ` : ''}
        </div>
    `;
}

function replaceQuizContent(content) {
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        quizContainer.innerHTML = content;
    }
}

function applyAnswerFeedback(selectedIndex) {
    const buttons = document.querySelectorAll('.quiz-option');
    buttons.forEach((btn, index) => {
        btn.style.pointerEvents = 'none';
        const circle = btn.querySelector('div div');
        
        if (index === selectedIndex) {
            btn.style.backgroundColor = 'rgba(228, 205, 133, 0.2)';
            btn.style.borderColor = 'rgba(228, 205, 133, 0.5)';
            circle.style.backgroundColor = '#e4cd85';
            circle.style.transform = 'scale(1)';
        } else {
            btn.style.opacity = '0.5';
            circle.style.backgroundColor = 'transparent';
        }
    });
}

// ================================
// 6. GESTIÓN DE FORMULARIO
// ================================
function validateFormInputs(formData) {
    const { nombre, whatsapp, serviceLocation, paymentMethod } = formData;
    const errors = [];
    
    if (!nombre || nombre.length < 2) {
        errors.push('Nombre debe tener al menos 2 caracteres');
    }
    
    if (!whatsapp) {
        errors.push('WhatsApp es requerido');
    }
    
    if (!serviceLocation) {
        errors.push('Selecciona una modalidad de servicio');
    }
    
    if (!paymentMethod) {
        errors.push('Selecciona un método de pago');
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

function processFormSubmission(formData, isQualified) {
    if (!isQualified) {
        throw new Error('Usuario no calificado');
    }
    
    const validation = validateFormInputs(formData);
    if (!validation.valid) {
        throw new Error(validation.errors.join(', '));
    }
    
    const locationMap = {
        'domicilio': 'Prefiero servicio a domicilio',
        'punto-encuentro': 'Prefiero punto de encuentro', 
        'flexible': 'Soy flexible con el lugar'
    };
    
    const paymentMap = {
        'efectivo': 'Pago en efectivo al momento del servicio',
        'transferencia': 'Pago por transferencia bancaria'
    };
    
    const existingData = JSON.parse(localStorage.getItem('leadData') || '{}');
    
    const finalData = {
        ...existingData,
        nombre: formData.nombre,
        whatsapp: formData.whatsapp,
        service_location: {
            whatsappText: locationMap[formData.serviceLocation],
            optionId: formData.serviceLocation,
            qualifying: true
        },
        payment_method: {
            whatsappText: paymentMap[formData.paymentMethod], 
            optionId: formData.paymentMethod,
            qualifying: true
        },
        qualified: true,
        timestamp: new Date().toISOString()
    };
    
    saveLeadData(finalData);
    return finalData;
}

// ================================
// 7. CONTROL DE FLUJO PRINCIPAL
// ================================
class QuizController {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.config = null;
        this.cityValidation = null;
        this.isQualified = false;
    }
    
    init() {
        console.log('🎯 Initializing Quiz Controller...');
        
        this.cityValidation = validateCityAccess();
        console.log('City validation:', this.cityValidation);
        
        if (!this.cityValidation.valid) {
            this.handleInvalidAccess();
            return;
        }
        
        this.config = getQuizConfiguration(this.cityValidation);
        this.renderCurrentQuestion();
    }
    
    handleInvalidAccess() {
        if (this.cityValidation.reason === 'no_city_param') {
            replaceQuizContent(this.getNoAccessTemplate());
        } else if (this.cityValidation.reason === 'city_not_available') {
            replaceQuizContent(this.getCityNotAvailableTemplate());
            storeNonQualifiedLead('city_not_available', this.cityValidation);
        }
    }
    
    renderCurrentQuestion() {
        const question = this.config.questions[this.currentQuestion];
        const html = renderQuizQuestion(question, this.currentQuestion, this.config.questions.length);
        replaceQuizContent(html);
    }
    
    handleAnswer(questionId, optionId, optionIndex) {
        const question = this.config.questions[this.currentQuestion];
        const option = question.options[optionIndex];
        
        this.answers[questionId] = {
            optionId,
            text: option.text,
            whatsappText: option.whatsappText,
            qualifying: option.qualifying,
            data: option.data || {}
        };

        console.log('Answer recorded:', this.answers[questionId]);
        
        applyAnswerFeedback(optionIndex);
        
        setTimeout(() => {
            if (this.currentQuestion < this.config.questions.length - 1) {
                this.currentQuestion++;
                this.renderCurrentQuestion();
            } else {
                this.completeQuiz();
            }
        }, 600);
    }
    
    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.renderCurrentQuestion();
        }
    }
    
    completeQuiz() {
        console.log('Quiz completed with answers:', this.answers);
        
        // Evaluación simplificada en línea
        const requiredQualifying = ['city_confirmation', 'symptoms', 'medical_studies', 'frustration', 'understanding', 'availability'];
        const qualifyingAnswers = requiredQualifying.filter(questionId => this.answers[questionId]?.qualifying === true);
        const qualified = qualifyingAnswers.length === requiredQualifying.length;
        
        console.log('Quiz evaluation:', { qualified, score: qualifyingAnswers.length, maxScore: requiredQualifying.length });
        
        const leadData = {
            ...this.answers,
            qualified,
            city: this.cityValidation.city,
            cityDisplay: this.cityValidation.cityDisplay,
            phone: CONFIG.cities.phones[this.cityValidation.city],
            urlParams: extractURLParams(),
            timestamp: new Date().toISOString()
        };
        
        saveLeadData(leadData);
        this.isQualified = qualified;
        
        if (qualified) {
            replaceQuizContent(this.getQualifiedTemplate());
            this.showSections(['precio', 'formulario']);
        } else {
            if (!this.answers.city_confirmation?.qualifying) {
                replaceQuizContent(this.getNotInCityTemplate());
                storeNonQualifiedLead('not_in_city', this.cityValidation, this.answers);
            } else {
                replaceQuizContent(this.getProfileNotQualifiedTemplate());
                storeNonQualifiedLead('profile_not_qualified', this.cityValidation, this.answers);
            }
        }
    }
    
    showSections(sectionIds) {
        sectionIds.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.remove('hidden');
                section.style.display = 'block';
            }
        });
    }
    
    getQualifiedTemplate() {
        return `
            <div class="glass rounded-xl p-8 text-center bg-green-600/20 border-2 border-green-400">
                <div class="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold mb-4 text-green-300">¡Perfecto! Calificas para el bioescáner</h3>
                <p class="text-white/90 mb-6 text-lg">Por tus respuestas, el bioescáner puede darte las respuestas que estás buscando en <strong>${this.cityValidation.cityDisplay}</strong>.</p>
                <button onclick="scrollToForm()" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-light to-gold-dark text-blue-primary font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 mb-4">
                    Completar mis datos
                </button>
            </div>
        `;
    }
    
    getCityNotAvailableTemplate() {
        return `
            <div class="glass rounded-xl p-8 text-center bg-orange-500/20 border-2 border-orange-400">
                <h3 class="text-2xl font-bold mb-4 text-orange-300">Por el momento no atendemos en ${this.cityValidation.cityDisplay}</h3>
                <p class="text-white/90 mb-4 text-lg">Actualmente nuestro servicio está disponible únicamente en <strong>Guaymas</strong> y <strong>Guadalajara</strong>.</p>
                <a href="https://lareddeluz.com" target="_blank" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-light to-gold-dark text-blue-primary font-bold text-lg rounded-full hover:scale-105 transition-all">Explorar La Red de Luz</a>
            </div>
        `;
    }
    
    getNotInCityTemplate() {
        return `
            <div class="glass rounded-xl p-8 text-center bg-orange-500/20 border-2 border-orange-400">
                <h3 class="text-2xl font-bold mb-4 text-orange-300">Solo atendemos en ${this.cityValidation.cityDisplay}</h3>
                <p class="text-white/90 mb-6 text-lg">Para recibir el servicio necesitas estar físicamente en <strong>${this.cityValidation.cityDisplay}</strong>.</p>
                <a href="https://lareddeluz.com" target="_blank" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-light to-gold-dark text-blue-primary font-bold text-lg rounded-full hover:scale-105 transition-all">Explorar La Red de Luz</a>
            </div>
        `;
    }
    
    getProfileNotQualifiedTemplate() {
        return `
            <div class="glass rounded-xl p-8 text-center bg-red-500/20 border-2 border-red-400">
                <h3 class="text-2xl font-bold mb-4 text-red-300">Puede que no sea el momento indicado</h3>
                <p class="text-white/90 mb-6 text-lg">Por tus respuestas, nuestro servicio podría no ser la mejor opción para ti en este momento.</p>
                <a href="https://lareddeluz.com" target="_blank" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-light to-gold-dark text-blue-primary font-bold text-lg rounded-full hover:scale-105 transition-all">Explorar La Red de Luz</a>
            </div>
        `;
    }
    
    getNoAccessTemplate() {
        return `
            <div class="glass rounded-xl p-8 text-center bg-red-500/20 border-2 border-red-400">
                <h3 class="text-2xl font-bold mb-4 text-red-300">Acceso no válido</h3>
                <p class="text-white/90 mb-6 text-lg">Para acceder al bioescáner necesitas venir desde uno de nuestros anuncios específicos por ciudad.</p>
                <a href="https://lareddeluz.com" target="_blank" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-light to-gold-dark text-blue-primary font-bold text-lg rounded-full hover:scale-105 transition-all">Ir a La Red de Luz</a>
            </div>
        `;
    }
}

// ================================
// 8. MANEJO DE FORMULARIO
// ================================
function setupFormHandler() {
    const leadForm = document.getElementById('leadForm');
    if (!leadForm) return;

    leadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        try {
            const formData = {
                nombre: document.getElementById('nombre')?.value.trim(),
                whatsapp: document.getElementById('whatsapp')?.value.trim(),
                serviceLocation: document.getElementById('serviceLocation')?.value,
                paymentMethod: document.getElementById('paymentMethod')?.value
            };
            
            const finalData = processFormSubmission(formData, quizController.isQualified);
            
            console.log('✅ Form processed successfully:', finalData);
            
            // Show loading state
            const submitBtn = leadForm.querySelector('.btn-submit');
            const btnText = submitBtn?.querySelector('.btn-text');
            const loading = submitBtn?.querySelector('.loading');
            
            if (submitBtn && btnText && loading) {
                submitBtn.disabled = true;
                btnText.style.display = 'none';
                loading.style.display = 'inline-block';
                loading.innerHTML = '<span style="display:inline-block;width:1.2em;height:1.2em;border:2px solid #e4cd85;border-top:2px solid transparent;border-radius:50%;animation:spin 0.7s linear infinite;vertical-align:middle;"></span>';
            }

            setTimeout(() => {
                window.location.href = 'gracias.html';
            }, 1200);
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert(error.message);
        }
    });
}

// ================================
// 9. UTILIDADES BÁSICAS
// ================================
function scrollToForm() {
    const formularioSection = document.getElementById('formulario');
    if (formularioSection) {
        formularioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
            const nombreInput = document.getElementById('nombre');
            if (nombreInput) nombreInput.focus();
        }, 800);
    }
}

function setupBasicListeners() {
    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const answer = item.querySelector('.faq-answer');
            const icon = btn.querySelector('.faq-icon');
            const wasActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-icon');
                if (otherAnswer) otherAnswer.style.display = 'none';
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            });

            if (!wasActive) {
                item.classList.add('active');
                if (answer) answer.style.display = 'block';
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ================================
// 10. INSTANCIA GLOBAL Y INICIALIZACIÓN
// ================================
let quizController;

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Bioescáner main.js refactorizado loaded');
    
    // Initialize controllers
    quizController = new QuizController();
    quizController.init();
    
    // Setup event handlers
    setupFormHandler();
    setupBasicListeners();
});

// ================================
// 11. FUNCIONES GLOBALES PARA EVENTOS
// ================================
window.handleQuizAnswer = (questionId, optionId, optionIndex) => {
    quizController.handleAnswer(questionId, optionId, optionIndex);
};

window.previousQuizQuestion = () => {
    quizController.previousQuestion();
};

window.scrollToForm = scrollToForm;