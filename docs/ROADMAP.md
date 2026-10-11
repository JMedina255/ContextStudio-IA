# Hoja de Ruta del Proyecto (Roadmap) — ContextStudio IA

Este documento detalla el plan de evolución integral de **ContextStudio IA**, estructurado en siete fases secuenciales. Cada fase define objetivos, actividades clave, entregables tangibles y criterios de aceptación específicos para asegurar calidad, consistencia y trazabilidad.

---

## Resumen de Fases

| Fase | Nombre | Estado | Enfoque Principal |
| :---: | :--- | :---: | :--- |
| **01** | **Repositorio Núcleo y Documentación** | **Completada** | Arquitectura, reglas, plantillas base y esquemas de datos. |
| **02** | **Modelo de Datos y Motor de Generación** | **Completada** | Tipos TypeScript, validación Ajv, plantillas Handlebars en memoria, cobertura 95.9%. |
| **03** | **Interfaz React y Experiencia de Usuario** | Pendiente (Siguiente) | UI con React, Tailwind CSS, formularios por pasos y previsualizador. |
| **04** | **Backend e Integración Inicial de IA** | Pendiente | Cloudflare Workers, proxy seguro y conexión con OpenAI / Claude / Gemini. |
| **05** | **Generadores Publicitarios y Audiovisuales** | Pendiente | Implementación de módulos de flyers, campañas, guiones y storyboards. |
| **06** | **Exportación, Historial e Integración con GitHub**| Pendiente | Empaquetado ZIP, persistencia local y sincronización con GitHub API. |
| **07** | **Despliegue, Pruebas y Estabilización** | Pendiente | GitHub Pages, pruebas E2E, auditoría de seguridad y lanzamiento v1.0. |

---

## Detalle de Fases

### Fase 01: Repositorio Núcleo y Documentación Inicial
- **Objetivo:** Establecer los cimientos conceptuales, la arquitectura técnica, las directrices de generación, los esquemas de datos y las plantillas base del proyecto sin escribir código de aplicación.
- **Actividades:**
  - Configuración del repositorio y directrices para agentes (`AGENTS.md`).
  - Redacción de documentos fundacionales en `nucleo/` (propósito, arquitectura, reglas, salida, módulos).
  - Creación de plantillas estándar con convención unificada en `plantillas/`.
  - Definición y validación del esquema `esquemas/negocio.schema.json` (Draft 2020-12) y archivo demostrativo `ejemplos/negocio.demo.json`.
  - Documentación de decisiones arquitectónicas (`docs/DECISIONES.md`) y hoja de ruta (`docs/ROADMAP.md`).
- **Entregables:** Repositorio estructurado y documentado, esquemas validados y README general.
- **Criterios de Aceptación:**
  - 100% de los documentos requeridos creados y con contenido técnico completo.
  - Esquema JSON sintácticamente válido y probado contra el archivo demo.
  - Cero código de frontend o backend prematuro en el repositorio.

---

### Fase 02: Modelo de Datos y Motor de Generación
- **Objetivo:** Construir el motor lógico capaz de procesar el perfil empresarial y renderizar la estructura Markdown completa en memoria.
- **Actividades:**
  - Tipado estricto en TypeScript a partir de `negocio.schema.json`.
  - Desarrollo del motor de inyección de plantillas con soporte para condicionales y listas.
  - Implementación de reglas de formateo y manejo de valores nulos o no especificados.
  - Suite de pruebas unitarias para el motor de generación documental.
- **Entregables:** Paquete TypeScript `@contextstudio/core` (o módulo interno) con funciones de compilación y pruebas automatizadas passing.
- **Criterios de Aceptación:**
  - Cobertura de pruebas unitarias > 85% para la generación de todos los módulos.
  - Sustitución determinista de variables sin residuos de sintaxis `{{...}}`.

---

### Fase 03: Interfaz React y Experiencia de Usuario
- **Objetivo:** Diseñar e implementar la aplicación web frontend que permita al usuario capturar datos y previsualizar los resultados de forma intuitiva.
- **Actividades:**
  - Inicialización del proyecto con Vite, React y Tailwind CSS.
  - Creación de componentes de formulario paso a paso (stepper): identidad, contactos, catálogo, audiencia y módulos.
  - Validación de campos en tiempo real mediante Zod o validador JSON Schema.
  - Panel interactivo de previsualización con Markdown viewer y resaltado de sintaxis.
- **Entregables:** Código fuente de la SPA en `src/`, componentes reutilizables y estilos Tailwind configurados.
- **Criterios de Aceptación:**
  - Navegación fluida y responsiva (desktop y mobile).
  - Almacenamiento automático del progreso en LocalStorage para prevenir pérdida de datos.

---

### Fase 04: Backend e Integración Inicial de IA
- **Objetivo:** Levantar la capa de servidor serverless en Cloudflare Workers para habilitar la asistencia inteligente sin exponer secretos en el navegador.
- **Actividades:**
  - Configuración del proyecto Cloudflare Workers con TypeScript y Wrangler.
  - Implementación de endpoints seguros con políticas CORS restrictivas y rate limiting.
  - Desarrollo del adaptador unificado para OpenAI, Anthropic y Google Gemini.
  - Funcionalidad de enriquecimiento asistido por IA (sugerencias de propuesta de valor, ganchos de venta).
- **Entregables:** API proxy funcional desplegada en Cloudflare Workers con variables de entorno encriptadas.
- **Criterios de Aceptación:**
  - Ninguna clave API expuesta en el bundle del cliente.
  - Respuestas estandarizadas ante fallas o indisponibilidad de proveedores externos.

---

### Fase 05: Generadores Publicitarios y Audiovisuales
- **Objetivo:** Habilitar la generación especializada de instrucciones para piezas gráficas, campañas publicitarias, ideas de video, guiones técnicos y storyboards.
- **Actividades:**
  - Conexión de los módulos MOD-03, MOD-04 y MOD-05 con la interfaz de usuario.
  - Parametrización de formatos para redes sociales (Meta Ads, Google Ads, TikTok, Reels, YouTube).
  - Generador de prompts optimizados para herramientas de video e imagen (Midjourney, DALL-E, Runway, Pika).
- **Entregables:** Generadores operativos integrados en el flujo de exportación.
- **Criterios de Aceptación:**
  - Salidas tabulares consistentes (tiempos, planos, diálogos) según los estándares definidos en las plantillas.

---

### Fase 06: Exportación, Historial e Integración con GitHub
- **Objetivo:** Proporcionar mecanismos completos de descarga, persistencia de proyectos múltiples y publicación remota.
- **Actividades:**
  - Integración de biblioteca de compresión ZIP en cliente (JSZip).
  - Funcionalidad de descarga de archivos Markdown sueltos o paquete completo comprimido.
  - Gestor de múltiples perfiles de negocio guardados localmente.
  - Integración opcional con GitHub REST API (Octokit) mediante Personal Access Token (PAT) del usuario para crear repositorios directos.
- **Entregables:** Sistema de exportación multi-destino y panel de gestión de proyectos locales.
- **Criterios de Aceptación:**
  - Descarga inmediata del archivo `.zip` con la estructura idéntica a `nucleo/03_ESTRUCTURA_SALIDA.md`.

---

### Fase 07: Despliegue, Pruebas y Estabilización
- **Objetivo:** Desplegar la aplicación en producción, auditar el rendimiento y publicar la versión oficial v1.0.
- **Actividades:**
  - Configuración de GitHub Actions para despliegue automatizado en GitHub Pages.
  - Pruebas de extremo a extremo (E2E) con Playwright o Cypress.
  - Auditoría de accesibilidad (Lighthouse > 90) y seguridad.
  - Documentación de usuario final y guía de despliegue.
- **Entregables:** Aplicación en vivo en GitHub Pages, pipeline CI/CD activo y release v1.0.0.
- **Criterios de Aceptación:**
  - Aplicación operativa en el dominio de GitHub Pages sin errores de consola.
  - Pipeline de CI/CD ejecutando pruebas y build exitosamente ante cada push a `master`.
