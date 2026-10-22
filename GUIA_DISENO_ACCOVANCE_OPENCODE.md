# ACCOVANCE — Guía de diseño e implementación para OpenCode

## Objetivo

Implementar la web de ACCOVANCE tomando como referencia visual y estructural el archivo `Minimal.dc.html` incluido en `V2 Minimalista-html.zip`.

Esta guía define la estructura de cada sección, el sistema visual y las reglas de consistencia. **No diseñar cada sección como si fuera una página independiente**: toda la web debe sentirse como un único sistema, con una jerarquía tipográfica, espaciado, ancho de contenido, márgenes y componentes compartidos.

Antes de modificar el proyecto:
1. Revisar la estructura, tecnologías y convenciones del repositorio existente.
2. Identificar las secciones y componentes ya implementados.
3. Reutilizar lo existente cuando sea posible.
4. No reemplazar ni migrar el stack del proyecto sin necesidad.
5. Usar la maqueta HTML como referencia; no copiar indiscriminadamente código de exportación que no sea necesario.

---

## 1. Identidad visual

### Paleta de colores

Usar estos colores como tokens globales. Mantener los mismos valores en toda la web y evitar introducir colores nuevos sin una razón de diseño clara.

| Token | HEX | Uso |
|---|---|---|
| `--color-forest` | `#22261F` | Fondo oscuro principal, hero y bloques destacados |
| `--color-forest-soft` | `#2C3326` | Variación sutil de fondos oscuros |
| `--color-olive` | `#37462B` | Color principal de marca, enlaces y botones |
| `--color-olive-hover` | `#2A3620` | Hover de enlaces y botones |
| `--color-accent` | `#A3E635` | Acento verde lima para detalles, indicadores y elementos destacados |
| `--color-accent-soft` | `#B7C99D` | Acentos secundarios y detalles suaves |
| `--color-cream` | `#F6F4EC` | Fondo claro principal |
| `--color-paper` | `#F4F6F1` | Fondo alternativo claro |
| `--color-line` | `#D9DED3` | Bordes, divisores y líneas de tarjetas |
| `--color-text` | `#22261F` | Texto principal sobre fondos claros |
| `--color-text-muted` | `#5B6355` | Texto secundario sobre fondos claros |
| `--color-white` | `#FFFFFF` | Texto sobre fondos oscuros y superficies blancas |

Reglas:
- El verde oscuro y el crema deben construir la base visual.
- El verde lima es un acento: usarlo con moderación, no como fondo de grandes bloques de texto.
- Verificar contraste y legibilidad en todos los tamaños.
- En fondos oscuros, usar texto claro; en fondos claros, usar texto oscuro.
- Evitar sombras fuertes, degradados decorativos excesivos y colores fuera de la paleta.
- Mantener estados `hover`, `focus` y `active` coherentes entre botones y enlaces.

### Tipografía

- Familia principal: **Inter**, con pesos 400, 500, 600 y 700.
- No mezclar familias tipográficas sin una necesidad concreta.
- Usar una escala tipográfica compartida (ver sección 3).
- Títulos con peso 500–600; texto corrido con peso 400; etiquetas y botones con peso 500–600.
- Mantener interlineado cómodo. No reducir el tamaño del texto para hacer entrar contenido: ajustar el ancho o la composición.

---

## 2. Sistema global de layout

### Contenedor y márgenes

Todas las secciones deben compartir el mismo contenedor horizontal y alineación.

- Contenedor central: `width: min(100% - 48px, 1200px)` en escritorio.
- En pantallas medianas: `width: min(100% - 40px, 1200px)`.
- En móviles: `width: calc(100% - 40px)`; dejar 20 px por lado como mínimo.
- Centrar el contenedor con `margin-inline: auto`.
- Usar el mismo contenedor para encabezados, textos, grillas, tarjetas y contenido del footer.
- No aplicar paddings horizontales distintos sección por sección, salvo que una composición visual lo requiera explícitamente. Incluso en ese caso, respetar la alineación del contenedor.

### Padding vertical de secciones

Usar una escala compartida para todas las secciones:

- Escritorio: `padding-block: clamp(80px, 9vw, 120px)`.
- Tablet: `padding-block: 72px`.
- Móvil: `padding-block: 56px`.

El hero puede tener un tratamiento especial por la altura del encabezado y su composición, pero debe conservar la misma alineación horizontal y la misma lógica de espaciado. Evitar que algunas secciones queden demasiado comprimidas y otras excesivamente largas.

### Espaciado

Usar una escala basada en múltiplos de 4 px:

- 4 px: separación mínima entre elementos relacionados.
- 8 px: separación compacta.
- 12 px: separación de etiquetas y pequeños grupos.
- 16 px: separación entre párrafos o elementos cercanos.
- 24 px: separación habitual entre componentes.
- 32 px: separación entre bloques relacionados.
- 48 px: separación entre grupos principales.
- 64 px: separación amplia dentro de una sección.
- 80–120 px: separación vertical exterior de secciones.

No usar valores arbitrarios diferentes en cada bloque cuando pueda resolverse con esta escala.

### Grillas y tarjetas

- Mantener alineaciones superiores consistentes entre tarjetas de una misma grilla.
- Usar `gap: 24px` como separación estándar entre tarjetas en escritorio y `16px` en móvil.
- Las tarjetas de una misma fila deben compartir padding, borde, radio y tratamiento tipográfico.
- No agregar tarjetas con sombras o radios distintos si pertenecen al mismo sistema.
- En escritorio, usar grillas de 2 a 4 columnas según el contenido; en móvil, una sola columna cuando no haya espacio suficiente.
- Evitar anchos fijos que generen desbordamiento.

### Radios y bordes

- Radio estándar para tarjetas y botones: entre `4px` y `8px`; priorizar una estética sobria y editorial.
- Bordes finos: `1px solid var(--color-line)` en superficies claras.
- En superficies oscuras, usar bordes claros con baja opacidad.
- Las líneas divisorias deben tener el mismo grosor y tono en toda la web.

---

## 3. Escala tipográfica compartida

Usar estos tamaños como base. Se permiten ajustes fluidos mediante `clamp()`, pero la jerarquía debe conservarse en todas las secciones.

| Token | Escritorio | Móvil | Uso |
|---|---:|---:|---|
| `--text-display` | 64–78 px | 40–46 px | Título principal del hero |
| `--text-h1` | 52–60 px | 36–42 px | Títulos principales de sección cuando la composición lo requiera |
| `--text-h2` | 40–48 px | 30–36 px | Títulos de sección |
| `--text-h3` | 24–28 px | 22–24 px | Títulos de tarjetas o subsecciones |
| `--text-h4` | 18–20 px | 18–20 px | Títulos secundarios |
| `--text-lead` | 19–21 px | 18–19 px | Bajadas y textos introductorios |
| `--text-body` | 16–17 px | 16 px | Párrafos generales |
| `--text-small` | 14–15 px | 14 px | Texto secundario, descripciones compactas |
| `--text-label` | 12–13 px | 12 px | Etiquetas, categorías y metadatos |
| `--text-micro` | 11 px | 11 px | Solo metadatos puntuales; no usar para contenido importante |

Reglas tipográficas:
- Usar la misma escala en todas las secciones. No inventar un tamaño de título diferente para cada una.
- Los títulos de sección deben compartir tamaño, peso, interlineado y tratamiento. Se puede variar el ancho o el salto de línea, no la jerarquía.
- Títulos de sección: line-height aproximado `1.08–1.15`; cuerpo: `1.55–1.7`.
- Limitar el ancho de los párrafos largos a aproximadamente `60–70ch`.
- El texto introductorio de una sección debe ser más grande que el texto de las tarjetas, pero menor que el título de sección.
- Usar mayúsculas pequeñas o etiquetas solo para categorías breves, no para párrafos.
- En móvil, reducir tamaños mediante reglas responsive; nunca permitir desbordamientos ni títulos ilegibles.

Variables CSS sugeridas:

```css
:root {
  --font-sans: "Inter", sans-serif;

  --color-forest: #22261F;
  --color-forest-soft: #2C3326;
  --color-olive: #37462B;
  --color-olive-hover: #2A3620;
  --color-accent: #A3E635;
  --color-accent-soft: #B7C99D;
  --color-cream: #F6F4EC;
  --color-paper: #F4F6F1;
  --color-line: #D9DED3;
  --color-text: #22261F;
  --color-text-muted: #5B6355;
  --color-white: #FFFFFF;

  --container-width: 1200px;
  --container-gutter: 24px;
  --section-space: clamp(80px, 9vw, 120px);

  --text-display: clamp(40px, 6vw, 78px);
  --text-h1: clamp(36px, 4.6vw, 60px);
  --text-h2: clamp(30px, 4vw, 48px);
  --text-h3: clamp(22px, 2vw, 28px);
  --text-h4: 20px;
  --text-lead: clamp(18px, 1.5vw, 21px);
  --text-body: 16px;
  --text-small: 14px;
  --text-label: 12px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
}

.container {
  width: min(calc(100% - 48px), var(--container-width));
  margin-inline: auto;
}

.section {
  padding-block: var(--section-space);
}

@media (max-width: 767px) {
  :root {
    --container-gutter: 20px;
    --section-space: 56px;
  }

  .container {
    width: calc(100% - 40px);
  }
}
```

---

## 4. Estructura y requisitos de cada sección

### A. Header / navegación

**Objetivo:** facilitar la navegación y mantener visible la identidad de ACCOVANCE.

Elementos:
- Logotipo o nombre ACCOVANCE.
- Enlaces: Servicios, Cómo trabajamos, Sectores, Contacto.
- En escritorio, navegación en una sola línea, alineada verticalmente.
- En móvil, menú compacto y accesible; evitar que los enlaces se amontonen.
- El CTA de contacto puede destacarse con el color de marca, sin competir con el hero.

Estilo:
- Fondo oscuro o tratamiento que se integre con el hero.
- Altura contenida, buen espacio horizontal y alineación con el contenedor global.
- Tipografía de navegación: 13–15 px, peso 500.
- Estados de foco visibles para navegación con teclado.
- El header no debe cambiar de ancho ni desalinearse entre secciones.

### B. Inicio / Hero (`#inicio`)

**Objetivo:** comunicar rápidamente qué hace ACCOVANCE y para quién trabaja.

Contenido:
- Identidad: “Consultoría Contable y Empresarial”.
- Título principal: “Estrategia y gestión para tomar mejores decisiones”.
- Bajada: “Acompañamos a empresas y PyMEs integrando análisis contable, financiero y de gestión para detectar oportunidades que agreguen valor a la empresa, resolver desafíos y construir soluciones adaptadas a cada negocio.”
- CTA principal: “Contacto” con indicador de flecha.

Diseño:
- Fondo verde oscuro `#22261F`.
- Título en crema o blanco, con acento lima solo en palabras o detalles puntuales si se necesita.
- Título display de 64–78 px en escritorio y 40–46 px en móvil.
- Bajada de 19–21 px en escritorio y 18–19 px en móvil, con ancho máximo de lectura.
- Mantener aire visual y una composición editorial. No llenar todos los espacios disponibles con elementos decorativos.
- Se pueden conservar las líneas, brillos o animaciones de la maqueta si no afectan rendimiento ni legibilidad.
- La animación no debe impedir leer el contenido ni provocar movimiento excesivo; respetar `prefers-reduced-motion`.
- Usar el mismo contenedor horizontal del resto de la web.

### C. Servicios (`#servicios`)

**Objetivo:** presentar claramente las áreas de trabajo.

Encabezado:
- Etiqueta: “Servicios” (12–13 px).
- Título: “Qué podemos hacer por tu empresa” (40–48 px escritorio; 30–36 px móvil).
- Bajada: “Soluciones adaptadas a cada etapa del negocio” (19–21 px escritorio; 18–19 px móvil).

Servicios:
1. **Consultoría Contable e Impositiva** — Gestión y planificación contable e impositiva con una mirada que acompaña las decisiones de la empresa.
2. **Gestión Económica y Financiera** — Costos, rentabilidad, flujo de fondos, presupuestos, indicadores y análisis económico-financiero.
3. **Estrategia y Gestión Empresarial** — Diagnóstico, planificación, organización, optimización de procesos y definición de prioridades.
4. **Desarrollo Comercial** — Análisis de oportunidades, procesos comerciales, clientes, canales y herramientas para acompañar el crecimiento.

Cierre: “No ofrecemos soluciones estandarizadas. Cada intervención parte de la realidad, los recursos y los objetivos de cada empresa.”

Diseño:
- Fondo claro crema o papel.
- Grilla de cuatro servicios en escritorio; dos columnas en tablet y una columna en móvil si mejora la lectura.
- Títulos de tarjeta: 22–28 px; descripciones: 16 px.
- Igualar padding, borde, separación y tratamiento de todas las tarjetas.
- Usar líneas, numeración o acentos de color para dar jerarquía, sin incorporar adornos innecesarios.
- La frase de cierre debe leerse como una conclusión de la sección, no como una quinta tarjeta.

### D. Método (`#metodo`)

**Objetivo:** explicar el proceso de acompañamiento de forma clara y ordenada.

Encabezado:
- Etiqueta: “Cómo trabajamos”.
- Título: “De entender el problema a implementar la solución”.

Pasos:
1. **Diagnosticar** — Conocemos la empresa, analizamos su situación e identificamos problemas, necesidades y oportunidades.
2. **Analizar** — Ordenamos la información y evaluamos las distintas áreas que impactan sobre el negocio.
3. **Diseñar** — Definimos prioridades y desarrollamos una estrategia y un plan de acción adaptados a la empresa.
4. **Implementar** — Acompañamos la puesta en práctica de las soluciones definidas.
5. **Medir y mejorar** — Evaluamos resultados, realizamos ajustes y acompañamos la evolución del negocio.

Diseño:
- Fondo oscuro o alternancia de tono respecto de las secciones claras; si se usa fondo oscuro, mantener contraste alto.
- Representar los cinco pasos como una secuencia coherente, con números `01–05`, títulos y descripciones.
- En escritorio, aprovechar una línea de progreso o una grilla horizontal solo si el texto conserva suficiente espacio.
- En móvil, apilar los pasos verticalmente; no comprimir cinco columnas.
- Números: 12–14 px o como recurso gráfico; títulos: 22–28 px; descripciones: 16 px.
- La secuencia debe compartir espaciado y alineación entre pasos.

### E. Sectores (`#sectores`)

**Objetivo:** mostrar comprensión de distintos tipos de negocio y áreas de especialización.

Encabezado:
- Etiqueta: “Sectores”.
- Título: “Experiencia que nos permite entender mejor cada negocio”.
- Texto introductorio: “Trabajamos con PyMEs y empresas de diferentes actividades, con especial conocimiento en:”.

Sectores:
1. **Farmacias y sector farmacéutico** — Gestión, rentabilidad, procesos, desarrollo comercial y evolución del negocio, comprendiendo las particularidades profesionales y regulatorias del sector.
2. **Agro y actividades vinculadas** — Gestión económica, financiera, contable e impositiva adaptada a las particularidades de la actividad.
3. **PyMEs, comercios y servicios** — Organización, análisis de gestión, procesos, planificación y desarrollo empresarial.

Diseño:
- Fondo claro, siguiendo la alternancia general de la página.
- Usar tres bloques o columnas en escritorio y apilado en móvil.
- Títulos: 22–28 px; descripción: 16 px.
- Mantener la misma estructura de tarjeta que en Servicios, salvo que haya una razón clara para usar bloques sin borde.
- No presentar sectores como servicios independientes ni agregar sectores no confirmados.
- Si se usan elementos visuales, deben ser discretos y coherentes entre sí.

### F. Nosotros / presentación institucional (`#nosotros`)

**Objetivo:** explicar la mirada de ACCOVANCE y su manera de trabajar.

Contenido:
- Etiqueta: “Accovance”.
- Título: “Una mirada profesional sobre cada decisión empresarial”.
- Texto: “Accovance nació desde la experiencia contable y evolucionó hacia una propuesta de consultoría integral, incorporando herramientas de gestión, análisis económico, estrategia y desarrollo empresarial. Trabajamos cerca de nuestros clientes, buscando comprender cada negocio antes de proponer una solución.”
- Frase destacada: “Porque detrás de cada número hay una decisión, y detrás de cada empresa, una realidad diferente.”
- Valores: **Claridad · Rigor · Cercanía · Visión de futuro**.

Diseño:
- Puede tener fondo oscuro para crear una pausa visual, o fondo claro si el método ya utiliza el oscuro. Evitar dos secciones oscuras consecutivas sin una transición visual intencional.
- Composición editorial de texto y espacio negativo; no convertir toda la sección en una grilla de tarjetas.
- Título: 40–48 px en escritorio; 30–36 px en móvil.
- Texto principal: 16–17 px; frase destacada: 19–21 px.
- Los cuatro valores deben tener el mismo estilo visual, tamaño y separación.
- No duplicar los valores para crear movimiento si eso produce texto repetido para lectores de pantalla.

### G. Equipo / fundadores (`#equipo`)

**Objetivo:** presentar a las personas que lideran el proyecto y transmitir confianza.

Contenido de referencia:
- Etiqueta: “Fundadores”.
- Título: “Las personas detrás de Accovance”.
- Tarjetas de integrantes con foto, nombre, rol y enlace a LinkedIn si existe.

Importante:
- La maqueta contiene textos de marcador como `[NOMBRE Y APELLIDO]` y `[Rol]`. No publicarlos como información real.
- Usar únicamente nombres, cargos, fotos y enlaces confirmados por el cliente. Si falta información, dejar el contenido preparado para completarlo o pedir los datos.
- No inventar integrantes ni credenciales.

Diseño:
- Fondo claro.
- Grilla uniforme; tarjetas con igual estructura, proporciones y separación.
- Fotos con relación de aspecto coherente y recorte consistente.
- Nombres: 20–24 px; cargos: 14–16 px; enlaces: 13–14 px.
- Si se aplica escala de grises a las fotos con color al pasar el cursor, garantizar que la interacción sea accesible y no sea la única forma de comunicar información.
- En móvil, apilar tarjetas sin reducir excesivamente las fotografías.

### H. Contacto (`#contacto`)

**Objetivo:** facilitar el siguiente paso para potenciales clientes.

Contenido:
- Título: “Hablemos de tu empresa”.
- Texto: “Cada organización tiene desafíos diferentes. Una primera conversación puede ayudarnos a conocer tu situación, identificar necesidades y evaluar de qué manera podemos acompañarte.”
- CTA: “Contacto” con flecha.
- Información: “Atención presencial y virtual”, “Rauch · Provincia de Buenos Aires”.
- Enlaces a WhatsApp, Email, LinkedIn e Instagram solo si se dispone de las URLs o datos reales.

Diseño:
- Sección de cierre con fondo oscuro `#22261F` o verde oliva, texto claro y CTA de alto contraste.
- Título: 40–48 px escritorio; 30–36 px móvil.
- Texto: 16–17 px; CTA: 14–16 px.
- Mantener el ancho del contenedor y la alineación global.
- No inventar números de WhatsApp, correos, perfiles ni destinos de enlaces.
- Los enlaces deben funcionar en móvil y escritorio; el correo debe usar `mailto:` y WhatsApp debe llevar a la URL confirmada.

### I. Footer

**Objetivo:** cerrar la web de forma simple y consistente.

Incluir:
- Marca ACCOVANCE.
- Navegación secundaria a las secciones principales.
- Datos de contacto confirmados.
- Redes sociales solo si existen enlaces válidos.
- Copyright, con año dinámico si el stack lo permite.

Diseño:
- Fondo oscuro coherente con el cierre.
- Texto secundario de 13–14 px.
- Divisores finos y espaciado consistente.
- En móvil, apilar los grupos y mantener áreas táctiles cómodas.

---

## 5. Reglas de consistencia obligatorias

1. **Un único sistema de diseño:** definir colores, tipografías, contenedor, paddings, espaciados, botones, tarjetas y breakpoints como variables o componentes reutilizables.
2. **Mismo ancho y alineación:** todos los encabezados y contenidos principales deben alinearse con el mismo contenedor.
3. **Mismo padding vertical:** aplicar el sistema de secciones global. No decidir los márgenes de forma independiente en cada sección.
4. **Misma escala tipográfica:** títulos de sección equivalentes deben compartir tamaño, peso e interlineado. Tarjetas equivalentes también.
5. **Componentes reutilizables:** crear clases/componentes comunes para `Container`, `SectionHeading`, `Button`, `ServiceCard`, `SectorCard` y `TeamCard` cuando el stack del proyecto lo permita.
6. **Alternancia de fondos intencional:** alternar claro y oscuro para separar secciones, sin cambiar de paleta.
7. **Responsive real:** revisar escritorio, tablet y móvil; ajustar grillas y tipografías sin cambiar arbitrariamente el sistema visual.
8. **Accesibilidad:** HTML semántico, contraste suficiente, navegación por teclado, `focus-visible`, textos alternativos, formularios etiquetados y respeto por `prefers-reduced-motion`.
9. **Animaciones con moderación:** conservar solo las que aporten calidad; no sacrificar rendimiento, accesibilidad ni lectura.
10. **Contenido verificado:** no inventar nombres, datos de contacto, redes sociales, fotos, servicios ni credenciales.
11. **No duplicar contenido:** evitar frases, valores o elementos repetidos accidentalmente.
12. **No romper funcionalidades existentes:** comprobar rutas, enlaces, navegación y formularios después de implementar.

---

## 6. Criterios de aceptación antes de terminar

- [ ] Todas las secciones tienen el mismo ancho de contenedor y alineación.
- [ ] Todas las secciones usan el mismo sistema de padding vertical.
- [ ] Los títulos de sección respetan una jerarquía común.
- [ ] Los párrafos, etiquetas, tarjetas y botones respetan la escala tipográfica.
- [ ] Los colores provienen de los tokens definidos.
- [ ] No hay desbordamientos horizontales en móvil.
- [ ] Las grillas se adaptan a tablet y móvil.
- [ ] Los botones, enlaces y navegación funcionan.
- [ ] No hay nombres ni datos de ejemplo publicados por error.
- [ ] Las animaciones respetan `prefers-reduced-motion`.
- [ ] Se verifican visualmente al menos los anchos de 1440 px, 1024 px, 768 px y 390 px.
- [ ] El resultado conserva el estilo minimalista, profesional, cálido y editorial de la referencia.

## Instrucción final para OpenCode

Primero inspeccioná el proyecto y localizá la implementación de cada sección. Después aplicá esta guía de forma transversal, centralizando tokens y componentes compartidos. No hagas retoques aislados que generen diferencias entre secciones. Al finalizar, resumí qué archivos modificaste, qué criterios aplicaste y qué datos reales siguen pendientes de confirmar.
