# Prompt para GitHub Copilot - Funnel de Ventas Bioescáner

## Contexto del Proyecto
Necesito crear un funnel de ventas simplificado para "La Red de Luz" que promocione sesiones de bioescáner. El flujo será: Landing → Thank You Page → WhatsApp → Llamada de pre-calificación → Cita. Diseño moderno, responsivo y elegante con estilo minimalista tipo Apple.

## Flujo del Funnel
1. **Usuario ve anuncio en Meta** → Llega a landing
2. **Landing page** → Formulario básico (máximo 3 campos)
3. **Thank you page** → CTA para WhatsApp (números segmentados por ciudad)
4. **WhatsApp** → Agendar llamada de pre-calificación
5. **Llamada** → Confirmar y agendar cita presencial
6. **Servicio** → Sesión de bioescáner

## Estructura de Archivos Requerida
```
bioscanner/
├── index.html          # Landing page principal
├── gracias.html        # Thank you page
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── videos/
└── README.md
```

## Números de WhatsApp por Ciudad
- **Guaymas:** 622 855 8278
- **Guadalajara:** 6221424577

## Especificaciones Técnicas

### HTML5 (index.html)
- Estructura semántica HTML5 completa
- Meta tags para SEO y redes sociales
- Favicon y configuración PWA básica
- Placeholders para videos embebidos
- Formulario de contacto funcional
- Estructura de secciones según el copywriting proporcionado

### CSS3 (styles.css)
- Variables CSS para paleta de colores de La Red de Luz:
  - `--gold-light: #e4cd85`
  - `--gold-dark: #c08a2d`
  - `--blue-accent: #163384`
  - `--black: #000000`
  - `--white: #ffffff`
- Diseño completamente responsivo (mobile-first)
- Gradientes elegantes y efectos hover suaves
- Animaciones CSS para scroll y transiciones
- Tipografía system fonts (estilo Apple)
- Box shadows y efectos glassmorphism
- Grid y Flexbox para layouts

### JavaScript (main.js)
- Intersection Observer para animaciones al scroll
- Smooth scrolling para navegación
- Validación de formularios básica
- Detección de ciudad para mostrar número de WhatsApp correcto
- Generación automática de enlaces de WhatsApp personalizados
- Efectos parallax suaves
- Lazy loading para imágenes/videos

## Copywriting y Estructura de Páginas

### PÁGINA 1: Landing Principal (index.html)

#### 1. Hero Section
**Headline:** "¿Te ha pasado que no te sientes bien… pero tus estudios dicen que estás 'normal'?"
**Subheadlines:**
- "Te sacan sangre… esperas 24, 48 horas… y cuando por fin te entregan los resultados… te explican a medias, y tú sigues igual."
- "Y lo peor… es que sentiste desde el principio que *algo no está bien*, pero no sabes qué."
- Video placeholder de fondo o imagen impactante

#### 2. Empatía y Validación
- "No me malinterpretes… estamos agradecidos por los doctores y lo que hacen por nosotros."
- "Pero hay momentos en los que uno simplemente quiere entender mejor a su cuerpo. Sin dolor. Sin tanto trámite. Sin sentirse como un expediente más."

#### 3. Solución
**Headline:** "¿Y si pudieras escuchar lo que tu cuerpo te quiere decir… en solo 5 minutos?"
- Explicación del bioescáner no invasivo
- Video placeholder explicativo
- Beneficios visuales con iconos

#### 4. Propuesta de Valor
- "Al final, te entregamos una rutina sencilla, personalizada, que puedes aplicar desde hoy… con o sin suplementos, dependiendo de tu caso."
- "Es rápido, cómodo, sin dolor… y 100% personalizado."
- Grid de beneficios:
  - ⏱️ 5 minutos + interpretación personalizada
  - 🏠 Servicio a domicilio o punto de encuentro
  - 📱 Seguimiento vía WhatsApp
  - 📋 Cupos limitados por agenda

#### 5. CTA Principal + Formulario
**Headline:** "No esperes a que tu cuerpo te grite lo que ya te está susurrando"
**Formulario (máximo 3 campos):**
1. **Nombre completo** (required)
2. **Ciudad** (select: Guaymas / Guadalajara / Otra) (required)
3. **Teléfono WhatsApp** (required)

**Botón:** "Quiero Escuchar a Mi Cuerpo"

### PÁGINA 2: Thank You Page (gracias.html)

#### 1. Hero de Confirmación
**Headline:** "¡Perfecto! Tu cuerpo ya está más cerca de ser escuchado"
**Subheadline:** "Hemos recibido tu información. Ahora viene la parte más importante..."

#### 2. Próximos Pasos
**Sección explicativa:**
- "En los próximos minutos, uno de nuestros especialistas te contactará vía WhatsApp"
- "Tendremos una breve llamada de pre-calificación (5-10 minutos) para entender mejor tu situación"
- "Después programaremos tu sesión de bioescáner en el horario que mejor te convenga"

#### 3. CTA WhatsApp Urgente
**Headline:** "¿Prefieres tomar la iniciativa?"
**Subheadline:** "Escríbenos ahora mismo y te responderemos al instante"

**Botones dinámicos basados en la ciudad seleccionada:**

**Para Guaymas:**
- **Botón:** "Escribir a WhatsApp Guaymas"
- **Número:** 622 855 8278
- **Mensaje pre-formateado:** "Hola, acabo de completar el formulario para la sesión de bioescáner en Guaymas. Mi nombre es [NOMBRE] y quiero agendar mi cita lo antes posible."

**Para Guadalajara:**
- **Botón:** "Escribir a WhatsApp Guadalajara"
- **Número:** 6221424577
- **Mensaje pre-formateado:** "Hola, acabo de completar el formulario para la sesión de bioescáner en Guadalajara. Mi nombre es [NOMBRE] y quiero agendar mi cita lo antes posible."

**Para Otras ciudades:**
- **Botón:** "Consultar Disponibilidad"
- **Número:** 6221424577 (Guadalajara como default)
- **Mensaje:** "Hola, me interesa la sesión de bioescáner pero estoy en [CIUDAD]. ¿Tienen servicio en mi zona?"

#### 4. Qué Esperar
**Timeline visual:**
1. **Ahora:** Contacto vía WhatsApp
2. **En 24 hrs:** Llamada de pre-calificación  
3. **Esta semana:** Tu sesión de bioescáner
4. **Inmediato:** Rutina personalizada

#### 5. Testimonios Placeholder
- 3 testimonios con fotos placeholder
- Enfoque en la experiencia personal y resultados

## Requerimientos de Diseño

### Estilo Visual
- **Minimalista y elegante** (inspirado en Apple)
- **Espacios en blanco** generosos
- **Tipografía** limpia y legible
- **Transiciones** suaves (0.3s ease)
- **Hover effects** sutiles pero notables

### Efectos Específicos
- Parallax sutil en hero section
- Fade-in animations al hacer scroll
- Gradientes dinámicos en backgrounds
- Box shadows con blur elegante
- Transform effects en hover
- Glassmorphism en cards

### Responsividad
- **Breakpoints:** 320px, 768px, 1024px, 1440px
- **Mobile-first** approach
- **Touch-friendly** buttons y links
- **Optimización** para velocidad de carga

## Funcionalidades JavaScript Específicas

### Landing Page (index.html)
```javascript
// Validación simple del formulario (3 campos)
// Almacenamiento temporal de datos para thank you page
// Animaciones de scroll y parallax
// Smooth scrolling interno
```

### Thank You Page (gracias.html)
```javascript
// Recuperar datos del formulario anterior
// Generar enlaces de WhatsApp dinámicos basados en ciudad
// Personalizar mensajes con nombre del usuario
// Countdown timer opcional para urgencia
// Tracking de conversión
```

### Funciones Comunes
```javascript
// Detección de ciudad para mostrar número correcto
// Generación automática de URLs de WhatsApp
// Lazy loading de imágenes/videos
// Animaciones al scroll con Intersection Observer
```

## Integración WhatsApp Automática

### Generación de Enlaces
```javascript
// Para Guaymas
const whatsappGuaymas = "https://wa.me/52622855828?text=Hola,%20acabo%20de%20completar%20el%20formulario%20para%20la%20sesión%20de%20bioescáner%20en%20Guaymas.%20Mi%20nombre%20es%20[NOMBRE]%20y%20quiero%20agendar%20mi%20cita%20lo%20antes%20posible.";

// Para Guadalajara  
const whatsappGdl = "https://wa.me/526221424577?text=Hola,%20acabo%20de%20completar%20el%20formulario%20para%20la%20sesión%20de%20bioescáner%20en%20Guadalajara.%20Mi%20nombre%20es%20[NOMBRE]%20y%20quiero%20agendar%20mi%20cita%20lo%20antes%20posible.";
```

## Requerimientos de Diseño

### Estilo Visual (Ambas páginas)
- **Minimalista y elegante** (inspirado en Apple)
- **Espacios en blanco** generosos
- **Tipografía** limpia y legible
- **Transiciones** suaves (0.3s ease)
- **Hover effects** sutiles pero notables

### Landing Page Específico
- **Hero impactante** con video/imagen de fondo
- **Formulario prominente** pero no invasivo
- **Flujo visual** que guíe al CTA
- **Trust signals** sutiles

### Thank You Page Específico
- **Confirmación clara** y positiva
- **Botones de WhatsApp** muy prominentes
- **Timeline visual** de próximos pasos
- **Sensación de urgencia** positiva

### Efectos Específicos
- Parallax sutil en hero sections
- Fade-in animations al hacer scroll
- Gradientes dinámicos en backgrounds
- Hover effects en botones de WhatsApp
- Micro-animaciones en iconos
- Glassmorphism en cards de testimonios

## Consideraciones de Conversión

### Landing Page
- **Formulario ultra-simple** (solo 3 campos)
- **CTA único y claro** 
- **Copy emocional** pero no agresivo
- **Trust signals** integrados naturalmente

### Thank You Page
- **Confirmación inmediata** del siguiente paso
- **Dos opciones de contacto** (esperar o tomar iniciativa)
- **Personalización** con datos del formulario
- **Urgencia positiva** sin presión excesiva

## Tracking y Analytics

### Eventos a Trackear
- Envío de formulario en landing
- Llegada a thank you page
- Clics en botones de WhatsApp
- Tiempo en página
- Scroll depth

### Pixels de Conversión
- Meta Pixel en ambas páginas
- Google Analytics 4
- Conversión principal: Clic en WhatsApp
- Conversión secundaria: Envío de formulario

## Integración Técnica

### Para Subdirectorio (laredeluz.com/bioscanner)
- Rutas relativas para todos los assets
- Meta canonical para SEO
- Robots.txt específico si es necesario
- Analytics tracking separado para el funnel
- Redirección automática entre páginas del funnel

### Performance
- Minificación de CSS/JS
- Optimización de imágenes
- Lazy loading implementado
- Critical CSS inline para ambas páginas

## Consideraciones Adicionales

### SEO
- Meta descriptions optimizadas para ambas páginas
- Schema markup para servicios de salud
- Open Graph y Twitter Cards
- Estructura de headings correcta
- URL amigables

### Accesibilidad
- Contraste adecuado en todos los elementos
- Alt texts descriptivos
- Navegación por teclado
- ARIA labels donde sea necesario
- Formularios accesibles

### Conversión
- **Landing:** Formulario simple, copy emocional, un solo CTA
- **Thank You:** Múltiples opciones de contacto, personalización
- Trust signals integrados
- Urgencia positiva sin presión

### Mobile-First
- **Formulario** especialmente optimizado para móvil
- **Botones de WhatsApp** fáciles de tocar
- **Números de teléfono** que se abran automáticamente
- **Experiencia** fluida entre páginas

---

**Nota para Copilot:** 
- Prioriza simplicidad y conversión sobre efectos complejos
- El formulario debe ser ultra-simple (solo 3 campos obligatorios)
- Los botones de WhatsApp deben ser muy prominentes
- Personaliza los mensajes de WhatsApp con los datos del formulario
- Mantén el tono emocional pero profesional de La Red de Luz
- Código limpio, comentado y siguiendo mejores prácticas