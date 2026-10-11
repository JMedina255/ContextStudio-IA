# 04. Módulos Funcionales del Sistema — ContextStudio IA

---

## 1. Visión General de la Modularidad

ContextStudio IA se articula mediante siete módulos funcionales independientes y complementarios. Esta arquitectura permite el desarrollo progresivo, el desacoplamiento de responsabilidades y la activación selectiva de capacidades por parte del usuario final.

> [!IMPORTANT]
> **Aclaración crítica sobre generación publicitaria y audiovisual:**
> Los módulos **MOD-03** y **MOD-05** generan **instrucciones estructuradas, briefs técnicos, guiones y prompts especializados** para que herramientas de IA (DALL-E, Midjourney, Stable Diffusion, Runway, Pika, Sora, ElevenLabs) o diseñadores humanos produzcan los activos. **No realizan el renderizado gráfico ni la edición de video directa.**

---

## 2. Catálogo de Módulos

---

### MOD-01: Gestión de Negocios
- **Código:** `MOD-01`
- **Nombre:** Gestión de Negocios y Perfiles Empresariales
- **Objetivo:** Capturar, validar y administrar el estado de los datos corporativos provistos por el usuario mediante formularios guiados e interactivos.
- **Funcionalidades principales:**
  - Formulario estructurado por pasos (identidad, ubicación, contactos, productos, público objetivo, identidad visual).
  - Validación en tiempo real basada en el esquema `esquemas/negocio.schema.json`.
  - Persistencia de borradores en almacenamiento local del navegador (`LocalStorage` / `IndexedDB`).
  - Importación y exportación de archivos de datos crudos en formato JSON.
- **Entradas esperadas:** Formularios de usuario en la interfaz web, o archivo JSON compatible con el esquema de negocio.
- **Salidas:** Objeto de datos validado y normalizado (`BusinessProfile`).
- **Dependencias:** Ninguna (módulo base).
- **Fase prevista de implementación:** Fase 02 (Esquema/Motor) y Fase 03 (UI React).

---

### MOD-02: Generación del Núcleo Empresarial
- **Código:** `MOD-02`
- **Nombre:** Generador del Núcleo Empresarial (Core Context)
- **Objetivo:** Sintetizar la información fundamental de la empresa en documentos Markdown coherentes que servirán de cimiento a cualquier proyecto de contexto.
- **Funcionalidades principales:**
  - Generación de `00_NEGOCIO.md`, `01_IDENTIDAD_VISUAL.md`, `02_PRODUCTOS_SERVICIOS.md` y `03_REGLAS_GENERALES.md`.
  - Creación del archivo de directrices maestras de sistema (`INSTRUCCIONES_CHATGPT.md`) y del índice general (`README.md`).
  - Aplicación estricta de las reglas de cero alucinación y manejo explícito de campos no especificados.
- **Entradas esperadas:** Objeto `BusinessProfile` validado provisto por `MOD-01`.
- **Salidas:** Conjunto de archivos Markdown correspondientes al directorio `nucleo/` del proyecto generado.
- **Dependencias:** `MOD-01`.
- **Fase prevista de implementación:** Fase 02.

---

### MOD-03: Generación de Instrucciones para Imágenes Publicitarias
- **Código:** `MOD-03`
- **Nombre:** Generador de Instrucciones para Piezas Gráficas y Flyers
- **Objetivo:** Elaborar guías técnicas y prompts de diseño para flyers, banners y material gráfico alineados con la identidad visual de la empresa.
- **Funcionalidades principales:**
  - Formulación de directrices de diagramación, jerarquía tipográfica y paleta de colores.
  - Creación de prompts optimizados para generadores de imágenes por IA (Midjourney, DALL-E 3, Stable Diffusion).
  - Definición de composiciones según el objetivo (lanzamiento, descuento, evento, branding).
- **Entradas esperadas:** Datos de identidad visual, productos seleccionados y objetivo de la pieza gráfica.
- **Salidas:** Documento `generadores/FLYERS.md`.
- **Dependencias:** `MOD-01`, `MOD-02`.
- **Fase prevista de implementación:** Fase 05.

---

### MOD-04: Generación de Campañas y Textos Publicitarios
- **Código:** `MOD-04`
- **Nombre:** Generador de Campañas y Contenido Escrito (Copywriting)
- **Objetivo:** Proveer marcos metodológicos y plantillas de copywriting para anuncios publicitarios y publicaciones orgánicas en redes sociales.
- **Funcionalidades principales:**
  - Generación de estructuras de campañas publicitarias (Meta Ads, Google Ads, LinkedIn Ads) con marcos AIDA, PAS o BAB.
  - Creación de plantillas de publicaciones orgánicas con ganchos (hooks), cuerpo y llamados a la acción (CTA).
  - Sugerencia de hashtags de marca y lineamientos de interacción con la comunidad.
- **Entradas esperadas:** Información de público objetivo, problemas que resuelve la oferta y canales seleccionados.
- **Salidas:** Documentos `generadores/CAMPAÑAS.md` y `generadores/PUBLICACIONES.md`.
- **Dependencias:** `MOD-01`, `MOD-02`.
- **Fase prevista de implementación:** Fase 05.

---

### MOD-05: Generación de Ideas y Guiones de Videos
- **Código:** `MOD-05`
- **Nombre:** Generador de Conceptos, Guiones y Storyboards Audiovisuales
- **Objetivo:** Estructurar el proceso creativo audiovisual desde la lluvia de ideas conceptuales hasta el desglose técnico escena por escena y storyboard para producción de video.
- **Funcionalidades principales:**
  - Generación de conceptos de video categorizados por plataforma (Reels, TikTok, YouTube, comerciales de televisión).
  - Desglose de guiones con especificación de tiempo (segundos), descripción visual, narración en off, diálogos y textos en pantalla.
  - Estructuración de storyboards con planos de cámara, transiciones, diseño sonoro y prompts para herramientas de video con IA (Runway Gen-2/Gen-3, Pika, Sora).
- **Entradas esperadas:** Catálogo de productos, beneficios clave, público objetivo y formatos de video deseados.
- **Salidas:** Documentos `generadores/IDEAS_VIDEO.md`, `generadores/GUIONES_VIDEO.md` y `generadores/STORYBOARD.md`.
- **Dependencias:** `MOD-01`, `MOD-02`.
- **Fase prevista de implementación:** Fase 05.

---

### MOD-06: Gestión e Integración de Proveedores de IA
- **Código:** `MOD-06`
- **Nombre:** Gestor de Integración y Adaptador de Modelos de IA
- **Objetivo:** Conectar de forma segura la plataforma con proveedores de inteligencia artificial (OpenAI, Anthropic Claude, Google Gemini) a través de un proxy backend sin exponer credenciales en el cliente.
- **Funcionalidades principales:**
  - Adaptador unificado para peticiones hacia OpenAI, Anthropic y Google.
  - Gestión de prompts de sistema y parámetros de inferencia (temperatura, top_p, max_tokens).
  - Manejo de fallos, reintentos automáticos y fallback entre modelos.
  - Filtrado de contenido y verificación de cumplimiento de directrices éticas.
- **Entradas esperadas:** Solicitudes de enriquecimiento o refinamiento de texto provenientes de los módulos generadores.
- **Salidas:** Textos y sugerencias generadas por IA debidamente estructuradas.
- **Dependencias:** Cloudflare Workers (Backend).
- **Fase prevista de implementación:** Fase 04.

---

### MOD-07: Exportación y Gestión de Archivos
- **Código:** `MOD-07`
- **Nombre:** Sistema de Exportación, Empaquetado y Distribución
- **Objetivo:** Compilar y entregar el conjunto de archivos generados al usuario en los formatos y destinos seleccionados.
- **Funcionalidades principales:**
  - Empaquetado de la estructura de directorios en memoria utilizando compresión ZIP.
  - Descarga de archivos Markdown individuales o del archivo `.zip` completo.
  - Visualizador y visor de diferencias (diff) antes de exportar.
  - (Futuro) Conexión con la API de GitHub para publicar el proyecto directamente en un repositorio nuevo o existente.
- **Entradas esperadas:** Árbol virtual de archivos generados por `MOD-02`, `MOD-03`, `MOD-04` y `MOD-05`.
- **Salidas:** Descargas locales (.zip, .md) o commits en GitHub.
- **Dependencias:** `MOD-02` (y opcionalmente `MOD-03`, `MOD-04`, `MOD-05`).
- **Fase prevista de implementación:** Fase 06.
