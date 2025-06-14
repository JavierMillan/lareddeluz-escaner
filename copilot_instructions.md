# Prompt para GitHub Copilot - Funnel de Ventas Bioescáner

## Contexto del Proyecto
Necesito crear un funnel de ventas completo para "La Red de Luz" que promocione sesiones de bioescáner. Debe ser una página moderna, responsiva y elegante con estilo minimalista tipo Apple.

## Estructura de Archivos Requerida
```
bioscanner/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── videos/
└── README.md
```

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
- Validación de formularios
- Integración con WhatsApp para envío de leads
- Efectos parallax suaves
- Lazy loading para imágenes/videos

## Copywriting y Estructura de Secciones

### 1. Hero Section
**Headline:** "¿Te ha pasado que no te sientes bien… pero tus estudios dicen que estás 'normal'?"
- Subtítulo emocional sobre la frustración médica
- Video placeholder de fondo o imagen impactante
- CTA secundario "Descubre Más"

### 2. Problema (Pain Points)
- "Te sacan sangre… esperas 24, 48 horas… te explican a medias"
- Tres cards con iconos representando frustraciones
- Diseño con gradientes suaves

### 3. Empatía y Validación
- "No me malinterpretes… estamos agradecidos por los doctores"
- Sección con fondo en gradiente dorado claro
- Texto centrado y elegante

### 4. Solución
**Headline:** "¿Y si pudieras escuchar lo que tu cuerpo te quiere decir… en solo 5 minutos?"
- Explicación del bioescáner no invasivo
- Video placeholder explicativo
- Visualización de beneficios con iconos

### 5. Propuesta de Valor
- "Rutina sencilla, personalizada"
- "Rápido, cómodo, sin dolor, 100% personalizado"
- Grid de beneficios con hover effects

### 6. Testimonios/Casos de Éxito
- Placeholder para testimonios reales
- Cards con fotos placeholder y quotes
- Diseño con glassmorphism

### 7. CTA Principal
**Texto:** "No esperes a que tu cuerpo te grite lo que ya te está susurrando"
**Botón:** "Quiero Escuchar a Mi Cuerpo"
- Fondo con gradiente impactante
- Botón con micro-animaciones

### 8. Información Adicional
- ✅ Duración: 5 minutos + interpretación
- 🏠 Servicio a domicilio
- 📦 Seguimiento vía WhatsApp
- 📲 Cupos limitados

### 9. Formulario de Contacto
- Campos: Nombre, Teléfono, Email, Ubicación, Mensaje
- Validación en tiempo real
- Integración directa con WhatsApp
- Diseño elegante con focus states

### 10. Footer
- Información de La Red de Luz
- Links legales
- Redes sociales

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

## Funcionalidades JavaScript

### Animaciones
```javascript
// Intersection Observer para animaciones
// Smooth scroll para navegación interna
// Parallax effects suaves
// Lazy loading para media
```

### Formulario
```javascript
// Validación en tiempo real
// Integración WhatsApp con mensaje pre-formateado
// Estados de loading y success
// Manejo de errores elegante
```

### UX Enhancements
```javascript
// Scroll progress indicator
// Sticky navigation con blur background
// Back to top button
// Mobile menu hamburger
```

## Integración Técnica

### Para Subdirectorio (laredeluz.com/bioscanner)
- Rutas relativas para todos los assets
- Meta canonical para SEO
- Robots.txt específico si es necesario
- Analytics tracking separado

### Performance
- Minificación de CSS/JS
- Optimización de imágenes
- Lazy loading implementado
- Critical CSS inline

## Consideraciones Adicionales

### SEO
- Meta description optimizada
- Schema markup para servicios de salud
- Open Graph y Twitter Cards
- Estructura de headings correcta

### Accesibilidad
- Contraste adecuado en todos los elementos
- Alt texts descriptivos
- Navegación por teclado
- ARIA labels donde sea necesario

### Conversión
- CTA buttons destacados con colores de contraste
- Formulario simple pero completo
- Trust signals integrados
- Urgencia sutil pero efectiva

---

**Nota para Copilot:** Genera código limpio, comentado y siguiendo las mejores prácticas. Prioriza la funcionalidad sobre efectos complejos. El resultado debe ser profesional, elegante y completamente funcional.