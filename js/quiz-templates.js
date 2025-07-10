// ================================
// TEMPLATES HTML PARA EL QUIZ
// ================================

const QuizTemplates = {
    
    // Template para las preguntas del quiz
    getQuizQuestions: (cityDisplay) => `
        <div class="quiz-question" data-question="1">
            <h3 class="text-xl font-bold mb-4 text-gold-light">1. ¿Te encuentras actualmente en ${cityDisplay}?</h3>
            <div class="space-y-3">
                <label class="quiz-option flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 border border-transparent hover:border-gold-light/30">
                    <input type="radio" name="q1" value="si" class="mr-3">
                    <span>Sí, estoy en ${cityDisplay} ✓</span>
                </label>
                <label class="quiz-option flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 border border-transparent hover:border-gold-light/30">
                    <input type="radio" name="q1" value="no" class="mr-3">
                    <span>No, estoy en otra ciudad</span>
                </label>
            </div>
        </div>

        <div class="quiz-question hidden" data-question="2">
            <h3 class="text-xl font-bold mb-4 text-gold-light">2. ¿Cuál describe mejor tu situación actual?</h3>
            <div class="space-y-3">
                <label class="quiz-option flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 border border-transparent hover:border-gold-light/30">
                    <input type="radio" name="q2" value="sin-problemas" class="mr-3">
                    <span>Me siento bien, solo tengo curiosidad</span>
                </label>
                <label class="quiz-option flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 border border-transparent hover:border-gold-light/30">
                    <input type="radio" name="q2" value="molestias-ocasionales" class="mr-3">
                    <span>Tengo molestias ocasionales pero nada urgente</span>
                </label>
                <label class="quiz-option flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 border border-transparent hover:border-gold-light/30">
                    <input type="radio" name="q2" value="sintomas-persistentes" class="mr-3">
                    <span>Tengo síntomas persistentes que me preocupan ✓</span>
                </label>
            </div>
        </div>

        <div class="quiz-question hidden" data-question="3">
            <h3 class="text-xl font-bold mb-4 text-gold-light">3. ¿Has hecho estudios médicos recientemente?</h3>
            <div class="space-y-3">
                <label class="quiz-option flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 border border-transparent hover:border-gold-light/30">
                    <input type="radio" name="q3" value="no-estudios" class="mr-3">
                    <span>No he hecho estudios</span>
                </label>
                <label class="quiz-option flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 border border-transparent hover:border-gold-light/30">
                    <input type="radio" name="q3" value="estudios-sin-respuestas" class="mr-3">
                    <span>Sí, pero no obtuve respuestas claras ✓</span>
                </label>
                <label class="quiz-option flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 border border-transparent hover:border-gold-light/30">
                    <input type="radio" name="q3" value="estudios-satisfactorios" class="mr-3">
                    <span>Sí, y me dieron respuestas satisfactorias</span>
                </label>
            </div>
        </div>

        <div class="quiz-question hidden" data-question="4">
            <h3 class="text-xl font-bold mb-4 text-gold-light">4. ¿Estás dispuesto/a a invertir $499 MXN si obtienes respuestas claras?</h3>
            <div class="space-y-3">
                <label class="quiz-option flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 border border-transparent hover:border-gold-light/30">
                    <input type="radio" name="q4" value="muy-caro" class="mr-3">
                    <span>Me parece muy caro</span>
                </label>
                <label class="quiz-option flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 border border-transparent hover:border-gold-light/30">
                    <input type="radio" name="q4" value="pensarlo" class="mr-3">
                    <span>Necesito pensarlo más</span>
                </label>
                <label class="quiz-option flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 border border-transparent hover:border-gold-light/30">
                    <input type="radio" name="q4" value="si-vale-pena" class="mr-3">
                    <span>Sí, si me da respuestas claras vale la pena ✓</span>
                </label>
            </div>
        </div>

        <div class="quiz-question hidden" data-question="5">
            <h3 class="text-xl font-bold mb-4 text-gold-light">5. ¿Te interesaría el 2x1 por $599 (para ti y otra persona)?</h3>
            <div class="space-y-3">
                <label class="quiz-option flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 border border-transparent hover:border-gold-light/30">
                    <input type="radio" name="q5" value="solo-yo" class="mr-3">
                    <span>No, solo quiero mi sesión individual ($499)</span>
                </label>
                <label class="quiz-option flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 border border-transparent hover:border-gold-light/30">
                    <input type="radio" name="q5" value="interesa-2x1" class="mr-3">
                    <span>Sí, me interesa el 2x1 por $599 ✓</span>
                </label>
                <label class="quiz-option flex items-center p-3 rounded-lg cursor-pointer hover:bg-white/10 border border-transparent hover:border-gold-light/30">
                    <input type="radio" name="q5" value="mas-info-2x1" class="mr-3">
                    <span>Me interesa, pero quiero más información</span>
                </label>
            </div>
        </div>
    `,

    // Template para ciudad no disponible
    getCityNotAvailableTemplate: (cityDisplay) => `
        <div class="glass rounded-xl p-8 text-center bg-orange-500/20 border-2 border-orange-400">
            <div class="w-20 h-20 bg-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z">
                    </path>
                </svg>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-orange-300">
                Por el momento no atendemos en ${cityDisplay}
            </h3>
            
            <p class="text-white/90 mb-4 text-lg">
                Actualmente nuestro servicio de bioescáner está disponible únicamente en <strong>Guaymas</strong> y <strong>Guadalajara</strong>.
            </p>
            
            <p class="text-white/80 mb-8">
                Hemos registrado tu interés. Si suficientes personas de <strong>${cityDisplay}</strong> se interesan, 
                consideraremos expandir nuestro servicio a tu ciudad.
            </p>
            
            <div class="bg-blue-600/20 rounded-lg p-4 mb-6">
                <p class="text-blue-200 font-semibold mb-2">💡 Mientras tanto:</p>
                <ul class="text-white/90 text-sm space-y-2 text-left max-w-md mx-auto">
                    <li>• Síguenos en redes sociales para futuras expansiones</li>
                    <li>• Explora los recursos gratuitos de La Red de Luz</li>
                    <li>• Recibe contenido de crecimiento integral</li>
                </ul>
            </div>
            
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
            
            <p class="text-white/60 text-sm mt-6">
                Tu interés en ${cityDisplay} ha sido registrado
            </p>
        </div>
    `,

    // Template para no estar en ciudad
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
            
            <h3 class="text-2xl font-bold mb-4 text-orange-300">
                Solo atendemos en ${cityDisplay}
            </h3>
            
            <p class="text-white/90 mb-6 text-lg">
                Para recibir el servicio de bioescáner necesitas estar físicamente en <strong>${cityDisplay}</strong> 
                ya que vamos a tu domicilio o a un punto de encuentro en la ciudad.
            </p>
            
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

    // Template para perfil no calificado
    getProfileNotQualifiedTemplate: () => `
        <div class="glass rounded-xl p-8 text-center bg-red-500/20 border-2 border-red-400">
            <div class="w-20 h-20 bg-red-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                    </path>
                </svg>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-red-300">
                Puede que no sea el momento indicado
            </h3>
            
            <p class="text-white/90 mb-6 text-lg">
                Por tus respuestas, nuestro servicio de bioescáner podría no ser la mejor opción para ti en este momento.
            </p>
            
            <div class="bg-blue-600/20 rounded-lg p-4 mb-6">
                <p class="text-blue-200 font-semibold mb-2">💡 Te recomendamos:</p>
                <ul class="text-white/90 text-sm space-y-2 text-left max-w-md mx-auto">
                    <li>• Explorar los recursos gratuitos de La Red de Luz</li>
                    <li>• Enfocarte en crecimiento personal integral</li>
                    <li>• Considerar el bioescáner más adelante si cambias de opinión</li>
                </ul>
            </div>
            
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

    // Template para calificado (con info del paquete)
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
                
                <h3 class="text-2xl font-bold mb-4 text-green-300">
                    ¡Perfecto! Calificas para el bioescáner
                </h3>
                
                <p class="text-white/90 mb-6 text-lg">
                    Por tus respuestas, el bioescáner puede darte las respuestas que estás buscando en <strong>${cityDisplay}</strong>.
                </p>
                
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
                    <p class="text-white/80 mb-6">
                        ¡Excelente! Ahora completa tus datos para coordinar tu cita.
                    </p>
                    
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

    // Template para acceso no válido
    getNoAccessTemplate: () => `
        <div class="glass rounded-xl p-8 text-center bg-red-500/20 border-2 border-red-400">
            <div class="w-20 h-20 bg-red-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                    </path>
                </svg>
            </div>
            
            <h3 class="text-2xl font-bold mb-4 text-red-300">
                Acceso no válido
            </h3>
            
            <p class="text-white/90 mb-6 text-lg">
                Para acceder al bioescáner necesitas venir desde uno de nuestros anuncios específicos por ciudad.
            </p>
            
            <a href="https://lareddeluz.com" target="_blank" 
               class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-light to-gold-dark text-blue-primary font-bold text-lg rounded-full hover:scale-105 transition-all">
                Ir a La Red de Luz
            </a>
        </div>
    `
};

// Exportar para uso global
window.QuizTemplates = QuizTemplates;