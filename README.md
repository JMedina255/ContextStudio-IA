# ContextStudio IA

> **Plataforma generadora de proyectos de contexto empresarial para herramientas de Inteligencia Artificial.**

[![Fase 02](https://img.shields.io/badge/Fase%2002-Completada-success)](#tabla-de-fases-de-desarrollo)
[![TypeScript](https://img.shields.io/badge/TypeScript-Estricto-blue.svg)](packages/core)
[![Pruebas](https://img.shields.io/badge/Pruebas-38%20Passing-brightgreen.svg)](packages/core/tests)
[![Cobertura](https://img.shields.io/badge/Cobertura->95%25-success.svg)](packages/core/vitest.config.ts)
[![Documentación](https://img.shields.io/badge/Documentación-Español-orange.svg)](nucleo/00_PROPOSITO.md)

---

## 1. Descripción del Proyecto

**ContextStudio IA** es una plataforma web modular diseñada para transformar la información verificada de un negocio en un ecosistema de documentación en formato **Markdown estructurado y estandarizado**. 

Estos archivos están optimizados para funcionar como la **memoria de contexto, manual de marca y conjunto de instrucciones operativas** en asistentes de Inteligencia Artificial como ChatGPT (Custom GPTs y proyectos compartidos), Claude (Claude Projects), Google Gemini y agentes autónomos.

> [!NOTE]
> **Estado de la Implementación (Fase 02):**
> El modelo de datos, la validación estricta (JSON Schema Draft 2020-12) y el motor de generación documental en memoria (`@contextstudio/core`) se encuentran **100% implementados y probados** con una cobertura superior al 95%. La aplicación web interactiva en React (Fase 03), el backend en Cloudflare Workers y las conexiones en vivo con APIs de IA (Fase 04) corresponden a las siguientes fases.

---

## 2. Problema que Resuelve

1. **Contexto fragmentado:** Evita tener que repetir el nombre, público y propuesta de valor de un negocio en cada conversación de chat con una IA.
2. **Cero alucinaciones:** Elimina la fabricación indebida de teléfonos, correos, precios o servicios por parte de los LLM mediante reglas estrictas de fidelidad de datos.
3. **Inconsistencia de marca:** Unifica el tono de voz, directrices cromáticas y mensajes clave para que todo el equipo trabaje con la misma identidad corporativa.
4. **Complejidad técnica eliminada:** Proporciona plantillas profesionales y listas para usar sin exigir conocimientos avanzados de ingeniería de prompts al usuario.

---

## 3. Funcionamiento del Sistema

```text
  [ Formulario Web o Archivo JSON (PerfilNegocio) ]
                         │
                         ▼
             Validador JSON Schema
             (Ajv 2020 + ajv-formats)
                         │
                         ▼
             Normalizador de Variables
             (Escapado seguro de tablas Markdown)
                         │
                         ▼
        Motor de Plantillas en Memoria (Handlebars)
        (Registro central de archivos según módulos)
                         │
                         ▼
             ProyectoGenerado en Memoria
        (13 archivos Markdown estructurados)
```

---

## 4. Tecnologías Seleccionadas

- **Frontend (Fase 03):** React 18+, TypeScript y Vite con Tailwind CSS.
- **Motor Núcleo (@contextstudio/core):** TypeScript estricto, sin dependencias de `fs` ni DOM en tiempo de ejecución.
- **Validación de Datos:** Ajv 2020 (JSON Schema Draft 2020-12) y `ajv-formats`.
- **Motor de Plantillas:** Handlebars con bundle de plantillas en memoria.
- **Pruebas y Cobertura:** Vitest y `@vitest/coverage-v8`.
- **Backend / Proxy de Seguridad (Fase 04):** Cloudflare Workers (serverless).
- **Alojamiento Web:** GitHub Pages (distribución de cliente estático).

---

## 5. Módulos Principales del Sistema

| Código | Módulo | Propósito Principal |
| :---: | :--- | :--- |
| **MOD-01** | [Gestión de Negocios](nucleo/04_MODULOS.md#mod-01-gestión-de-negocios) | Captura de datos, validación y administración de perfiles. |
| **MOD-02** | [Generación del Núcleo Empresarial](nucleo/04_MODULOS.md#mod-02-generación-del-núcleo-empresarial) | Producción de los 7 documentos base de negocio e identidad. |
| **MOD-03** | [Instrucciones de Imágenes Publicitarias](nucleo/04_MODULOS.md#mod-03-generación-de-instrucciones-para-imágenes-publicitarias) | Briefs técnicos y prompts de diseño para flyers y banners (`generadores/FLYERS.md`). |
| **MOD-04** | [Campañas y Textos Publicitarios](nucleo/04_MODULOS.md#mod-04-generación-de-campañas-y-textos-publicitarios) | Marcos de copywriting (AIDA, PAS), anuncios y publicaciones (`CAMPAÑAS.md`, `PUBLICACIONES.md`). |
| **MOD-05** | [Ideas y Guiones de Videos](nucleo/04_MODULOS.md#mod-05-generación-de-ideas-y-guiones-de-videos) | Conceptos, guiones técnicos y storyboards (`IDEAS_VIDEO.md`, `GUIONES_VIDEO.md`, `STORYBOARD.md`). |
| **MOD-06** | [Integración de Proveedores de IA](nucleo/04_MODULOS.md#mod-06-gestión-e-integración-de-proveedores-de-ia) | Conexión segura con OpenAI, Anthropic y Google (Fase 04). |
| **MOD-07** | [Exportación y Gestión de Archivos](nucleo/04_MODULOS.md#mod-07-exportación-y-gestión-de-archivos) | Empaquetado ZIP, descargas y futura sincronización con GitHub. |

---

## 6. Estructura del Repositorio

```text
ContextStudio-IA/
│
├── README.md                      # Presentación general e índice de navegación
├── .gitignore                     # Configuración de exclusiones de Git (incluye .env y output/)
├── AGENTS.md                      # Directrices obligatorias para agentes de IA
├── package.json                   # Configuración raíz de npm workspaces
├── tsconfig.json                  # Configuración base de TypeScript
│
├── nucleo/                        # Documentación fundacional de la plataforma
│   ├── 00_PROPOSITO.md            # Visión, objetivos y definición de proyecto de contexto
│   ├── 01_ARQUITECTURA.md         # Pila tecnológica, capas y diagrama Mermaid
│   ├── 02_REGLAS_GENERALES.md     # Políticas de fidelidad de datos y cero alucinación
│   ├── 03_ESTRUCTURA_SALIDA.md    # Estándar de árbol de directorios generado por negocio
│   └── 04_MODULOS.md              # Especificación detallada de los módulos MOD-01 al 07
│
├── plantillas/                    # Especificaciones formales de plantillas (Fase 01)
│   ├── README.md                  # Diferencias entre especificaciones y ejecutables
│   ├── negocio/00_NEGOCIO.md
│   ├── identidad/01_IDENTIDAD_VISUAL.md
│   ├── flyers/GENERADOR_FLYERS.md
│   ├── campanas/GENERADOR_CAMPANAS.md
│   └── videos/
│
├── esquemas/
│   └── negocio.schema.json        # Esquema formal JSON Schema Draft 2020-12
│
├── ejemplos/
│   └── negocio.demo.json          # Datos de ejemplo ficticios validados
│
├── packages/
│   └── core/                      # Paquete reutilizable del motor (@contextstudio/core)
│       ├── src/
│       │   ├── types/             # Tipos TypeScript sincronizados con el esquema
│       │   ├── validation/        # Validador con Ajv Draft 2020-12
│       │   ├── normalization/     # Normalización de datos y formateo Markdown
│       │   ├── templates/         # Bundle en memoria y motor Handlebars
│       │   ├── generators/        # Generador principal en memoria
│       │   ├── utils/             # Funciones de escape Markdown y seguridad de rutas
│       │   └── index.ts
│       ├── templates/             # Plantillas ejecutables (.hbs)
│       ├── tests/                 # 38 pruebas unitarias e integración (Vitest)
│       └── package.json
│
├── scripts/
│   └── demo.ts                    # Demostración CLI del motor de generación
│
└── docs/
    ├── ROADMAP.md                 # Plan de desarrollo en siete fases
    └── DECISIONES.md              # Registro de decisiones arquitectónicas (ADR)
```

---

## 7. Tabla de Fases de Desarrollo

| Fase | Nombre | Alcance Principal | Estado |
| :---: | :--- | :--- | :---: |
| **01** | **Repositorio núcleo y documentación** | **Estructura, documentos fundacionales, plantillas y esquemas** | **Completada** |
| **02** | **Modelo de datos y motor de generación** | **Paquete `@contextstudio/core`, validación Ajv, plantillas en memoria y pruebas** | **Completada** |
| **03** | Interfaz React y UX | Formularios interactivos, previsualizador Markdown y estilos Tailwind | *Pendiente (Siguiente)* |
| **04** | Backend e integración inicial de IA | Cloudflare Workers, proxy seguro y conexión con proveedores | *Pendiente* |
| **05** | Generadores publicitarios y audiovisuales | Integración de módulos de flyers, campañas, guiones y storyboards | *Pendiente* |
| **06** | Exportación, historial e integración con GitHub | Descarga ZIP, gestión de perfiles locales y sincronización remota | *Pendiente* |
| **07** | Despliegue, pruebas y estabilización | Publicación en GitHub Pages, pruebas E2E y release v1.0 | *Pendiente* |

---

## 8. Comandos del Proyecto y Ejecución

### Requisitos del Sistema
- **Node.js:** v20.x o v22.x LTS (probado con v22.17.1).
- **npm:** v10.x+.

### Instalación de Dependencias
```bash
npm install
```

### Comprobación de Tipos TypeScript (Strict Mode)
```bash
npm run typecheck
```

### Compilación del Paquete Núcleo
```bash
npm run build
```

### Ejecución de Pruebas Automatizadas (Vitest)
```bash
npm run test
```

### Ejecución de Pruebas con Reporte de Cobertura
```bash
npm run test:coverage
```

### Ejecución Demostrativa por Consola (CLI)
```bash
npm run demo
```
Este comando lee `ejemplos/negocio.demo.json`, lo valida, ejecuta el motor en memoria y escribe los 13 archivos resultantes en la carpeta local ignorada `output/kafi-nova-tostaduria/`.

---

## 9. Documentación de Referencia

- [Propósito y Visión General](nucleo/00_PROPOSITO.md)
- [Arquitectura Técnica Propuesta](nucleo/01_ARQUITECTURA.md)
- [Reglas Generales de Generación](nucleo/02_REGLAS_GENERALES.md)
- [Estructura del Proyecto de Salida](nucleo/03_ESTRUCTURA_SALIDA.md)
- [Catálogo de Módulos Funcionales](nucleo/04_MODULOS.md)
- [Diferencias de Plantillas](plantillas/README.md)
- [Registro de Decisiones de Arquitectura (ADR)](docs/DECISIONES.md)
- [Directrices para Agentes de IA](AGENTS.md)

---

## 10. Próximos Pasos

El siguiente hito del proyecto corresponde a la **Fase 03: Interfaz React y Experiencia de Usuario**, la cual abarcará:
1. Inicialización de la SPA con React, Vite y Tailwind CSS.
2. Componentes de formulario por pasos (stepper) que alimenten el tipo `PerfilNegocio`.
3. Previsualizador en tiempo real de los documentos generados con soporte para resaltado de sintaxis Markdown.
