// ================================
// MAIN.JS REFACTORIZADO - QUIZ OPTIMIZADO CON DISPONIBILIDAD
// ================================

// Spinner animación para el formulario
const style = document.createElement('style');
style.innerHTML = `@keyframes spin { 0%{transform:rotate(0deg);} 100%{transform:rotate(360deg);} }`;
document.head.appendChild(style);

// ================================
// TEMPLATES HTML INLINE (PARA EVITAR DEPENDENCIAS)
// ================================
const QuizTemplates = {
    getCityNotAvailableTemplate: (cityDisplay) => `
        <div class="glass rounded-xl p-8 text-center bg-orange-500/20 border-2 border-orange-400">
            <div class="w-20 h-20 bg-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z">
                    </path>
                </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-orange-300">Por el momento no atendemos en ${cityDisplay}</h3>
            <p class="text-white/90 mb-4 text-lg">Actualmente nuestro servicio está disponible únicamente en <strong>Guaymas</strong> y <strong>Guadalajara</strong>.</p>
            <div class="space-y-4">
                <a href="https://lareddeluz.com" target="_blank" 
                   class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-light to-gold-dark text-blue-primary font-bold text-lg rounded-full hover:scale-105 transition-all">
                    Explorar La Red de Luz
                </a>
                <div>
                    <button onclick="location.reload()" 
                            class="px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all">
                        Responder de nuevo
                    </button>
                </div>
            </div>
        </div>
    `,

    getNotInCityTemplate: (cityDisplay) => `
        <div class="glass rounded-xl p-8 text-center bg-orange-500/20 border-2 border-orange-400">
            <div class="w-20 h-20 bg-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                    </path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z">
                    </path>
                </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-orange-300">Solo atendemos en ${cityDisplay}</h3>
            <p class="text-white/90 mb-6 text-lg">Para recibir el servicio necesitas estar físicamente en <strong>${cityDisplay}</strong>.</p>
            <div class="space-y-4">
                <a href="https://lareddeluz.com" target="_blank" 
                   class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-light to-gold-dark text-blue-primary font-bold text-lg rounded-full hover:scale-105 transition-all">
                    Explorar La Red de Luz
                </a>
                <div>
                    <button onclick="location.reload()" 
                            class="px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all">
                        Responder de nuevo
                    </button>
                </div>
            </div>
        </div>
    `,

    getProfileNotQualifiedTemplate: () => `
        <div class="glass rounded-xl p-8 text-center bg-red-500/20 border-2 border-red-400">
            <div class="w-20 h-20 bg-red-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                    </path>
                </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-red-300">Puede que no sea el momento indicado</h3>
            <p class="text-white/90 mb-6 text-lg">Por tus respuestas, nuestro servicio podría no ser la mejor opción para ti en este momento.</p>
            <div class="space-y-4">
                <a href="https://lareddeluz.com" target="_blank" 
                   class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-light to-gold-dark text-blue-primary font-bold text-lg rounded-full hover:scale-105 transition-all">
                    Explorar La Red de Luz
                </a>
                <div>
                    <button onclick="location.reload()" 
                            class="px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all">
                        Responder de nuevo
                    </button>
                </div>
            </div>
        </div>
    `,

    getQualifiedTemplate: (cityDisplay, wants2x1) => {
        const packageInfo = wants2x1 ? {
            title: 'Paquete 2x1 seleccionado',
            price: '$599 MXN (para 2 personas)',
            savings: 'Ahorras $399 vs. 2 sesiones individuales',
            details: [
                '• 2 bioescáneres completos de 45 parámetros',
                '• 2 interpretaciones personalizadas (40 min c/u)',
                '• 2 planes de acción específicos',
                '• Servicio a domicilio en ' + cityDisplay,
                '• Puedes traer a familiar, pareja o amigo/a'
            ]
        } : {
            title: 'Sesión individual',
            price: '$499 MXN',
            savings: '',
            details: [
                '• Bioescáner completo de 45 parámetros',
                '• Interpretación personalizada (40 min)',
                '• Plan de acción específico para tu caso',
                '• Servicio a domicilio en ' + cityDisplay
            ]
        };

        return `
            <div class="glass rounded-xl p-8 text-center bg-green-600/20 border-2 border-green-400">
                <div class="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                        </path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold mb-4 text-green-300">¡Perfecto! Calificas para el bioescáner</h3>
                <p class="text-white/90 mb-6 text-lg">Por tus respuestas, el bioescáner puede darte las respuestas que estás buscando en <strong>${cityDisplay}</strong>.</p>
                <div class="bg-blue-600/20 rounded-lg p-4 mb-6">
                    <p class="text-blue-200 font-semibold mb-2">🎯 ${packageInfo.title}:</p>
                    <ul class="text-white/90 text-sm space-y-2 text-left max-w-md mx-auto">
                        ${packageInfo.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                    <div class="mt-4 pt-3 border-t border-blue-400/20">
                        <p class="text-xl font-bold text-gold-light">${packageInfo.price}</p>
                        ${packageInfo.savings ? `<p class="text-green-300 text-sm font-semibold">${packageInfo.savings}</p>` : ''}
                    </div>
                </div>
                <div class="text-center">
                    <p class="text-white/80 mb-6">¡Excelente! Ahora completa tus datos para coordinar tu cita.</p>
                    <button onclick="scrollToForm()" 
                            class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-light to-gold-dark text-blue-primary font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 mb-4">
                        Completar mis datos
                        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </button>
                    <div class="text-white/60 text-sm">
                        <p>o baja para ver más detalles</p>
                        <div class="animate-bounce mt-2">
                            <svg class="w-6 h-6 text-gold-light mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getNoAccessTemplate: () => `
        <div class="glass rounded-xl p-8 text-center bg-red-500/20 border-2 border-red-400">
            <div class="w-20 h-20 bg-red-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                    </path>
                </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-red-300">Acceso no válido</h3>
            <p class="text-white/90 mb-6 text-lg">Para acceder al bioescáner necesitas venir desde uno de nuestros anuncios específicos por ciudad.</p>
            <a href="https://lareddeluz.com" target="_blank" 
               class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-light to-gold-dark text-blue-primary font-bold text-lg rounded-full hover:scale-105 transition-all">
                Ir a La Red de Luz
            </a>
        </div>
    `
};

// ================================
// CONFIGURACIÓN DE CIUDADES
// ================================
const AVAILABLE_CITIES = ['guaymas', 'guadalajara'];
const PHONE_NUMBERS = {
    'guaymas': '6228558278',
    'guadalajara': '6221424577'
};

// ================================
// VARIABLES GLOBALES
// ================================
let currentQuestion = 1;
let quizAnswers = {};
let isQualified = false;
let cityValidation = null;

// ================================
// FUNCIONES DE URL Y CIUDAD
// ================================
function getURLParams() {
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

function validateCityFromURL() {
    const params = getURLParams();
    const ciudad = params.ciudad;
    
    if (!ciudad) {
        console.log('❌ No hay ciudad en URL');
        return { valid: false, city: null, reason: 'no_city_param' };
    }
    
    const ciudadLower = ciudad.toLowerCase().trim();
    const isAvailable = AVAILABLE_CITIES.includes(ciudadLower);
    
    console.log('Validando ciudad URL:', { ciudad, ciudadLower, isAvailable });
    
    if (isAvailable) {
        return { valid: true, city: ciudadLower, cityDisplay: ciudad };
    } else {
        return { valid: false, city: ciudadLower, cityDisplay: ciudad, reason: 'city_not_available' };
    }
}

function storeNonQualifiedLead(reason, cityData, quizData = {}) {
    try {
        let nonQualifiedLeads = JSON.parse(localStorage.getItem('nonQualifiedLeads') || '[]');
        
        const newLead = {
            reason: reason,
            city: cityData?.city,
            cityDisplay: cityData?.cityDisplay,
            quizAnswers: quizData,
            urlParams: getURLParams(),
            timestamp: new Date().toISOString(),
            id: Date.now() + Math.random().toString(36).substr(2, 9)
        };
        
        nonQualifiedLeads.push(newLead);
        
        if (nonQualifiedLeads.length > 100) {
            nonQualifiedLeads = nonQualifiedLeads.slice(-100);
        }
        
        localStorage.setItem('nonQualifiedLeads', JSON.stringify(nonQualifiedLeads));
        console.log('Lead no calificado guardado:', newLead);
        
    } catch (error) {
        console.error('Error guardando lead no calificado:', error);
    }
}

// ================================
// FUNCIONES DE UI Y FEEDBACK
// ================================
function hideAllSections() {
    const sectionsToHide = ['precio', 'formulario'];
    sectionsToHide.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('hidden');
            section.style.display = 'none';
        }
    });
}

function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('hidden');
        section.style.display = 'block';
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
}

function replaceQuizContent(content) {
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        quizContainer.innerHTML = content;
    }
}

// ================================
// QUIZ OPTIMIZADO - FUNCIÓN PRINCIPAL
// ================================
function generateQuizQuestions() {
    console.log('🎯 Initializing optimized quiz...');
    
    const cityValidationResult = validateCityFromURL();
    cityValidation = cityValidationResult; // Guardar en variable global
    console.log('Validación ciudad:', cityValidationResult);
    
    if (!cityValidationResult.valid) {
        console.log('❌ Ciudad no válida');
        if (cityValidationResult.reason === 'no_city_param') {
            replaceQuizContent(QuizTemplates.getNoAccessTemplate());
        } else if (cityValidationResult.reason === 'city_not_available') {
            replaceQuizContent(QuizTemplates.getCityNotAvailableTemplate(cityValidationResult.cityDisplay));
            storeNonQualifiedLead('city_not_available', cityValidationResult);
        }
        return;
    }
    
    // Inicializar quiz optimizado
    initOptimizedQuiz(cityValidationResult);
}

// Nueva función para quiz optimizado
function initOptimizedQuiz(cityValidation) {
    const QUIZ_CONFIG = {
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
                        data: { city: cityValidation.city, phone: PHONE_NUMBERS[cityValidation.city] }
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

    // Renderizar quiz optimizado
    renderOptimizedQuiz(QUIZ_CONFIG, cityValidation);
}

// Función para renderizar quiz
function renderOptimizedQuiz(config, cityValidation) {
    let currentQuestion = 0;
    let answers = {};
    
    function renderQuestion() {
        const question = config.questions[currentQuestion];
        const progress = ((currentQuestion + 1) / config.questions.length) * 100;
        
        const html = `
            <div class="max-w-3xl mx-auto">
                <h2 class="text-3xl font-bold text-center mb-8 text-white">¿Calificas para el bioescáner?</h2>
                <p class="text-center text-white/80 mb-12">${config.questions.length} preguntas rápidas:</p>

                <div class="mb-8">
                    <div class="flex justify-between text-sm text-white/70 mb-2">
                        <span>Pregunta ${currentQuestion + 1} de ${config.questions.length}</span>
                        <span>${Math.round(progress)}%</span>
                    </div>
                    <div class="w-full bg-gray-700 rounded-full h-2">
                        <div class="bg-gradient-to-r from-gold-light to-gold-dark h-2 rounded-full transition-all duration-500"
                             style="width: ${progress}%"></div>
                    </div>
                </div>

                <div class="glass rounded-xl p-6 mb-6">
                    <h3 class="text-xl font-bold mb-4 text-gold-light">
                        ${currentQuestion + 1}. ${question.question}
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

                ${currentQuestion > 0 ? `
                    <div class="text-center">
                        <button onclick="previousQuizQuestion()" 
                                class="text-white/70 hover:text-white flex items-center mx-auto">
                            ← Regresar
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
        
        replaceQuizContent(html);
    }

    function handleAnswer(questionId, optionId, optionIndex) {
        const question = config.questions[currentQuestion];
        const option = question.options[optionIndex];
        
        answers[questionId] = {
            optionId,
            text: option.text,
            whatsappText: option.whatsappText,
            qualifying: option.qualifying,
            data: option.data || {}
        };

        console.log('Answer recorded:', answers[questionId]);

        // Visual feedback MEJORADO - sin lag
        const buttons = document.querySelectorAll('.quiz-option');
        buttons.forEach((btn, index) => {
            btn.style.pointerEvents = 'none';
            const circle = btn.querySelector('div div');
            
            if (index === optionIndex) {
                // Botón seleccionado
                btn.style.backgroundColor = 'rgba(228, 205, 133, 0.2)';
                btn.style.borderColor = 'rgba(228, 205, 133, 0.5)';
                // Radio button activo
                circle.style.backgroundColor = '#e4cd85';
                circle.style.transform = 'scale(1)';
            } else {
                // Botones no seleccionados
                btn.style.opacity = '0.5';
                circle.style.backgroundColor = 'transparent';
            }
        });

        // Reducir delay de 800ms a 600ms
        setTimeout(() => {
            if (currentQuestion < config.questions.length - 1) {
                currentQuestion++;
                renderQuestion();
            } else {
                completeQuiz();
            }
        }, 600);
    }

    function completeQuiz() {
        console.log('Quiz completed with answers:', answers);
        
        // Evaluación de calificación
        const cityAnswer = answers.city_confirmation;
        const symptomsAnswer = answers.symptoms;
        const medicalAnswer = answers.medical_studies;
        const frustrationAnswer = answers.frustration;
        const understandingAnswer = answers.understanding;
        const availabilityAnswer = answers.availability;
        
        const inCorrectCity = cityAnswer && cityAnswer.qualifying === true;
        const hasSymptoms = symptomsAnswer && symptomsAnswer.qualifying === true;
        const hasUnclearStudies = medicalAnswer && medicalAnswer.qualifying === true;
        const isFrustrated = frustrationAnswer && frustrationAnswer.qualifying === true;
        const needsUnderstanding = understandingAnswer && understandingAnswer.qualifying === true;
        const hasAvailability = availabilityAnswer && availabilityAnswer.qualifying === true;
        
        const qualified = inCorrectCity && hasSymptoms && hasUnclearStudies && isFrustrated && needsUnderstanding && hasAvailability;
        
        console.log('Quiz evaluation:', {
            inCorrectCity,
            hasSymptoms,
            hasUnclearStudies,
            isFrustrated,
            needsUnderstanding,
            hasAvailability,
            qualified
        });
        
        // Guardar datos
        const leadData = {
            ...answers,
            qualified,
            city: cityValidation.city,
            cityDisplay: cityValidation.cityDisplay,
            phone: PHONE_NUMBERS[cityValidation.city],
            urlParams: getURLParams(),
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('leadData', JSON.stringify(leadData));
        console.log('Lead data saved:', leadData);
        
        // Actualizar variables globales
        isQualified = qualified;
        quizAnswers = answers;
        
        // Mostrar resultado
        if (qualified) {
            const wants2x1 = false; // Por ahora sin 2x1
            replaceQuizContent(QuizTemplates.getQualifiedTemplate(cityValidation.cityDisplay, wants2x1));
            showSection('precio');
            showSection('formulario');
        } else {
            if (!inCorrectCity) {
                replaceQuizContent(QuizTemplates.getNotInCityTemplate(cityValidation.cityDisplay));
                storeNonQualifiedLead('not_in_city', cityValidation, answers);
            } else {
                replaceQuizContent(QuizTemplates.getProfileNotQualifiedTemplate());
                storeNonQualifiedLead('profile_not_qualified', cityValidation, answers);
            }
        }
    }

    // Funciones globales para los botones
    window.handleQuizAnswer = handleAnswer;
    window.previousQuizQuestion = () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderQuestion();
        }
    };

    // Iniciar quiz
    renderQuestion();
}

// ================================
// FORMULARIO CON VALIDACIÓN
// ================================
function setupFormHandler() {
    const leadForm = document.getElementById('leadForm');
    if (!leadForm) return;

    leadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('📝 Intento de envío. isQualified:', isQualified);
        
        if (!isQualified) {
            console.log('❌ Usuario NO calificó');
            alert('Error: Debes completar y aprobar el cuestionario de calificación primero.');
            window.location.href = '#quiz';
            return;
        }

        const nombre = document.getElementById('nombre');
        const whatsapp = document.getElementById('whatsapp');
        
        let valid = true;
        
        if (!nombre?.value.trim() || nombre.value.trim().length < 2) {
            nombre.style.borderColor = '#dc3545';
            nombre.focus();
            valid = false;
        }
        
        if (!whatsapp?.value.trim()) {
            whatsapp.style.borderColor = '#dc3545';
            if (valid) whatsapp.focus();
            valid = false;
        }

        if (!valid) {
            alert('Por favor completa todos los campos correctamente.');
            return;
        }

        const submitBtn = leadForm.querySelector('.btn-submit');
        const btnText = submitBtn?.querySelector('.btn-text');
        const loading = submitBtn?.querySelector('.loading');
        
        if (submitBtn && btnText && loading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            loading.style.display = 'inline-block';
            loading.innerHTML = '<span style="display:inline-block;width:1.2em;height:1.2em;border:2px solid #e4cd85;border-top:2px solid transparent;border-radius:50%;animation:spin 0.7s linear infinite;vertical-align:middle;"></span>';
        }

        const existingData = JSON.parse(localStorage.getItem('leadData') || '{}');
        
        const formData = {
            ...existingData,
            nombre: nombre.value.trim(),
            whatsapp: whatsapp.value.trim(),
            qualified: true,
            source: 'bioscanner_landing',
            timestamp: new Date().toISOString(),
            city: existingData.city || cityValidation?.city,
            cityDisplay: existingData.cityDisplay || cityValidation?.cityDisplay,
            urlParams: existingData.urlParams || getURLParams()
        };
        
        localStorage.setItem('leadData', JSON.stringify(formData));
        console.log('✅ Datos completos guardados:', formData);

        setTimeout(() => {
            window.location.href = 'gracias.html';
        }, 1200);
    });
}

// ================================
// WHATSAPP MESSAGING - TOTALMENTE COHERENTE CON EL QUIZ DE 6 PREGUNTAS
// ================================
function getOptimizedWhatsAppMessage(leadData) {
    const nombre = leadData.nombre || 'Cliente interesado';
    
    // Construir el mensaje basado en las respuestas EXACTAS del quiz
    const quizSummary = [];
    
    // Ubicación
    if (leadData.city_confirmation?.whatsappText) {
        quizSummary.push(leadData.city_confirmation.whatsappText);
    }
    
    // Síntomas
    if (leadData.symptoms?.whatsappText) {
        quizSummary.push(leadData.symptoms.whatsappText);
    }
    
    // Estudios médicos
    if (leadData.medical_studies?.whatsappText) {
        quizSummary.push(leadData.medical_studies.whatsappText);
    }
    
    // Frustración
    if (leadData.frustration?.whatsappText) {
        quizSummary.push(leadData.frustration.whatsappText);
    }
    
    // Comprensión
    if (leadData.understanding?.whatsappText) {
        quizSummary.push(leadData.understanding.whatsappText);
    }

    // Disponibilidad
    let availabilityText = "Prefiero esta semana o la próxima";
    if (leadData.availability?.whatsappText) {
        availabilityText = leadData.availability.whatsappText;
    }

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

🎯 Mi situación específica:
${quizSummary.map(text => `• ${text}`).join('\n')}

❓ Lo que busco con el bioescáner:
• Respuestas específicas en lugar de "todo está normal"
• Un panorama integral de mis 45 parámetros de salud
• Plan de acción basado en información real

⏰ Disponibilidad:
• ${availabilityText}
• Servicio a domicilio o punto de encuentro
• Pago en efectivo al momento de la sesión

¿Cuándo podríamos coordinar mi cita?${campaignInfo}

Muchas gracias!`;
}

// Función original de WhatsApp como fallback
function getPersonalizedWhatsAppMessage(leadData) {
    // Si tenemos datos del quiz optimizado, usar esos
    if (leadData && leadData.city_confirmation) {
        return getOptimizedWhatsAppMessage(leadData);
    }
    
    // Fallback al mensaje genérico si no hay datos del quiz
    const nombre = leadData.nombre || 'Cliente interesado';
    const ciudadDisplay = leadData.cityDisplay || leadData.city || 'mi ciudad';

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

¿Cuándo podríamos coordinar mi cita?

Muchas gracias!`;
}

function setupWhatsappButtonImproved() {
    const whatsappButton = document.getElementById('whatsappButton');
    if (!whatsappButton) return;
    
    if (!isQualified) {
        console.log('❌ WhatsApp bloqueado');
        alert('Debes completar el proceso de calificación primero.');
        window.location.href = '#quiz';
        return;
    }
    
    const leadData = JSON.parse(localStorage.getItem('leadData') || '{}');
    const phone = PHONE_NUMBERS[leadData.city] || PHONE_NUMBERS['guadalajara'];
    const message = getPersonalizedWhatsAppMessage(leadData);
    const url = `https://api.whatsapp.com/send?phone=521${phone}&text=${encodeURIComponent(message)}`;
    
    console.log('📱 WhatsApp enviado:', {
        nombre: leadData.nombre,
        city: leadData.city,
        phone: phone
    });
    
    window.open(url, '_blank', 'noopener');
}

// ================================
// FUNCIÓN SCROLL TO FORM
// ================================
function scrollToForm() {
    showSection('precio');
    showSection('formulario');
    
    setTimeout(() => {
        const formularioSection = document.getElementById('formulario');
        if (formularioSection) {
            formularioSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            setTimeout(() => {
                const nombreInput = document.getElementById('nombre');
                if (nombreInput) {
                    nombreInput.focus();
                }
            }, 800);
        } else {
            const precioSection = document.getElementById('precio');
            if (precioSection) {
                precioSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }
    }, 500);
}

// ================================
// LISTENERS BÁSICOS
// ================================
function setupBasicListeners() {
    // Intersection Observer
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

    // Scroll suave
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
}

// ================================
// FUNCIÓN DE TESTING/DEBUG
// ================================
function debugQuizState() {
    const leadData = JSON.parse(localStorage.getItem('leadData') || '{}');
    console.log('=== QUIZ DEBUG INFO ===');
    console.log('Is Qualified:', isQualified);
    console.log('Quiz Answers:', quizAnswers);
    console.log('Lead Data:', leadData);
    console.log('City Validation:', cityValidation);
    console.log('URL Params:', getURLParams());
    console.log('WhatsApp Message Preview:');
    console.log(getPersonalizedWhatsAppMessage(leadData));
    return {
        isQualified,
        quizAnswers,
        leadData,
        cityValidation,
        urlParams: getURLParams(),
        whatsappMessage: getPersonalizedWhatsAppMessage(leadData)
    };
}

// ================================
// INICIALIZACIÓN
// ================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Bioescáner main.js optimizado loaded');
    console.log('🔗 URL Params:', getURLParams());
    
    generateQuizQuestions();
    setupFormHandler();
    setupBasicListeners();
    
    const whatsappButton = document.getElementById('whatsappButton');
    if (whatsappButton) {
        whatsappButton.onclick = function(e) {
            e.preventDefault();
            setupWhatsappButtonImproved();
        };
    }
});

// Funciones globales
window.setupWhatsappButtonImproved = setupWhatsappButtonImproved;
window.getURLParams = getURLParams;
window.scrollToForm = scrollToForm;
window.debugQuizState = debugQuizState;
window.isQualified = () => isQualified;
window.cityValidation = () => cityValidation;
window.quizAnswers = () => quizAnswers;