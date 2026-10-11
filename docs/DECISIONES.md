# Registro de Decisiones de Arquitectura (ADR) — ContextStudio IA

Este documento recopila las decisiones de arquitectura y diseño técnico adoptadas a lo largo de la evolución de **ContextStudio IA**, distinguiendo claramente entre decisiones **confirmadas** y propuestas **pendientes de validación**.

---

## Índice de Decisiones

| Código | Decisión | Estado | Fecha |
| :---: | :--- | :---: | :---: |
| [ADR-001](#adr-001-formato-markdown-como-estándar-de-salida) | Formato Markdown (GFM) como estándar universal de salida | **Confirmada** | 2026-10-11 |
| [ADR-002](#adr-002-estrategia-de-cero-alucinación-en-generación) | Regla estricta de cero alucinación y manejo explícito de valores no provistos | **Confirmada** | 2026-10-11 |
| [ADR-003](#adr-003-esquema-de-datos-basado-en-json-schema-draft-2020-12) | Esquema formal de datos basado en JSON Schema Draft 2020-12 | **Confirmada** | 2026-10-11 |
| [ADR-004](#adr-004-arquitectura-frontend-con-react-typescript-y-vite) | Frontend estático con React, TypeScript, Vite y Tailwind CSS | **Confirmada** | 2026-10-11 |
| [ADR-005](#adr-005-despliegue-del-frontend-en-github-pages) | Despliegue estático del frontend en GitHub Pages | **Confirmada** | 2026-10-11 |
| [ADR-006](#adr-006-backend-proxy-con-cloudflare-workers-para-claves-api) | Backend Serverless con Cloudflare Workers para protección de claves API | *Propuesta en validación* | 2026-10-11 |
| [ADR-007](#adr-007-integración-directa-con-github-api-mediante-octokit) | Integración con GitHub REST API (Octokit) para creación de repositorios | *Propuesta en validación* | 2026-10-11 |

---

## Detalle de Decisiones

### ADR-001: Formato Markdown como Estándar de Salida
- **Fecha:** 2026-10-11
- **Estado:** **Confirmada**
- **Contexto:** Las herramientas de IA (ChatGPT, Claude Projects, Copilot) consumen información en diversos formatos (JSON, XML, PDF, Markdown). Se requería elegir el formato óptimo para el usuario y los LLM.
- **Decisión:** Adoptar **GitHub Flavored Markdown (GFM)** como formato estándar exclusivo de los documentos generados.
- **Justificación:** Markdown ofrece máxima densidad semántica, es legible de forma nativa por humanos, tiene soporte universal en todos los LLM sin overhead de tokens comparado con JSON o XML, y se versiona limpiamente en sistemas Git.

---

### ADR-002: Estrategia de Cero Alucinación en Generación
- **Fecha:** 2026-10-11
- **Estado:** **Confirmada**
- **Contexto:** Los modelos generativos tienden a inventar datos de contacto, precios o direcciones cuando no se les suministran explícitamente, destruyendo la utilidad práctica de un contexto empresarial.
- **Decisión:** Prohibir categóricamente que los generadores inventen datos. Los campos no provistos deben omitirse o marcarse como `[No especificado por el usuario]`.
- **Justificación:** La veracidad de la información corporativa es innegociable. Un contexto con datos inventados genera confusión en los equipos y riesgos legales o de atención al cliente.

---

### ADR-003: Esquema de Datos Basado en JSON Schema Draft 2020-12
- **Fecha:** 2026-10-11
- **Estado:** **Confirmada**
- **Contexto:** Se necesita un contrato de datos estricto para validar formularios, importar perfiles y serializar información antes de inyectarla en plantillas.
- **Decisión:** Utilizar **JSON Schema Draft 2020-12** (`esquemas/negocio.schema.json`) como única fuente de verdad para la estructura del negocio.
- **Justificación:** Draft 2020-12 es el estándar moderno más amplio y permite tipado estricto, expresiones regulares, validación de formatos (email, uri) y tipado nulo flexible (`["string", "null"]`).

---

### ADR-004: Arquitectura Frontend con React, TypeScript y Vite
- **Fecha:** 2026-10-11
- **Estado:** **Confirmada**
- **Contexto:** La interfaz de usuario debe ser ágil, permitir formularios dinámicos complejos y renderizar previsualizaciones Markdown en tiempo real.
- **Decisión:** Construir la SPA con React 18+, TypeScript estricto, Vite como bundler y Tailwind CSS para diseño visual.
- **Justificación:** Ecosistema maduro, excelente rendimiento de construcción en caliente con Vite, seguridad de tipos de TypeScript y versatilidad de diseño con Tailwind sin peso residual innecesario.

---

### ADR-005: Despliegue del Frontend en GitHub Pages
- **Fecha:** 2026-10-11
- **Estado:** **Confirmada**
- **Contexto:** Se busca un hosting gratuito, confiable y estrechamente integrado con el repositorio de GitHub para distribuir la aplicación web.
- **Decisión:** Hospedar los activos compilados de la SPA en **GitHub Pages**.
- **Justificación:** Cero costo de infraestructura, CDN global provisto por GitHub y pipelines de despliegue directo mediante GitHub Actions.

---

### ADR-006: Backend Proxy con Cloudflare Workers para Claves API
- **Fecha:** 2026-10-11
- **Estado:** *Propuesta pendiente de validación técnica (Fase 04)*
- **Contexto:** GitHub Pages solo sirve activos estáticos. Exponer las claves de OpenAI, Anthropic o Gemini en el cliente es una vulnerabilidad inaceptable de seguridad.
- **Decisión:** Proponer una capa intermedia en **Cloudflare Workers** para actuar como proxy seguro y adaptador unificado de IA.
- **Justificación:** Cloudflare Workers ofrece latencias de borde ultrabajas (<10ms), capa gratuita generosa, gestión segura de secretos (`wrangler secret`) y facilidad para implementar CORS y limitadores de tasa.
- **Condición de validación:** Se evaluará en la Fase 04 si es preferible Cloudflare Workers o un backend alternativo serverless (como Vercel Functions o AWS Lambda) según la complejidad de la autenticación de usuarios.

---

### ADR-007: Integración Directa con GitHub API mediante Octokit
- **Fecha:** 2026-10-11
- **Estado:** *Propuesta pendiente de validación técnica (Fase 06)*
- **Contexto:** Además de descargar archivos `.zip`, los usuarios desarrolladores o agencias se beneficiarían de crear un repositorio directamente en su cuenta de GitHub con los archivos generados.
- **Decisión:** Evaluar la integración con `@octokit/rest` en la Fase 06 permitiendo al usuario ingresar opcionalmente un Personal Access Token (PAT) con permisos de escritura.
- **Justificación:** Automatiza el flujo de despliegue de contextos empresariales para equipos técnicos sin requerir pasos manuales de git init / push.
- **Condición de validación:** Se validará en la Fase 06 garantizando que los tokens del usuario no se persistan indebidamente en ningún servidor.
