# ContextStudio IA

> **Plataforma generadora de proyectos de contexto empresarial para herramientas de Inteligencia Artificial.**

[![Fase 01](https://img.shields.io/badge/Fase%2001-Completada-success)](#tabla-de-fases-de-desarrollo)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-blue.svg)](LICENSE)
[![Documentación](https://img.shields.io/badge/Documentación-Español-orange.svg)](nucleo/00_PROPOSITO.md)

---

## 1. Descripción del Proyecto

**ContextStudio IA** es una plataforma web modular diseñada para transformar la información verificada de un negocio en un ecosistema de documentación en formato **Markdown estructurado y estandarizado**. 

Estos archivos están optimizados para funcionar como la **memoria de contexto, manual de marca y conjunto de instrucciones operativas** en asistentes de Inteligencia Artificial como ChatGPT (Custom GPTs y proyectos compartidos), Claude (Claude Projects), Google Gemini y agentes autónomos.

> [!WARNING]
> **Estado de la Implementación (Fase 01):**
> La aplicación web interactiva en React, el backend en Cloudflare Workers y las integraciones con APIs de IA **aún no están implementadas**. Actualmente este repositorio alberga la arquitectura documental fundacional, las plantillas maestras de ingeniería de contexto, los esquemas de datos JSON y la hoja de ruta técnica del proyecto.

---

## 2. Problema que Resuelve

1. **Contexto fragmentado:** Evita tener que repetir el nombre, público y propuesta de valor de un negocio en cada conversación de chat con una IA.
2. **Cero alucinaciones:** Elimina la fabricación indebida de teléfonos, correos, precios o servicios por parte de los LLM mediante reglas estrictas de fidelidad de datos.
3. **Inconsistencia de marca:** Unifica el tono de voz, directrices cromáticas y mensajes clave para que todo el equipo trabaje con la misma identidad corporativa.
4. **Complejidad técnica eliminada:** Proporciona plantillas profesionales y listas para usar sin exigir conocimientos avanzados de ingeniería de prompts al usuario.

---

## 3. Funcionamiento Propuesto

```text
  [ Usuario / PyME / Agencia ]
               │
               ▼
   Formulario Web Guiado (React + TS)
   (Datos de negocio, catálogo, identidad y metas)
               │
               ▼
   Validación de Datos (JSON Schema)
               │
               ▼
   Motor de Generación + Asistencia IA (Cloudflare Proxy)
   (Sustitución de variables y enriquecimiento contextual)
               │
               ▼
   Exportación Inmediata (.zip / .md / GitHub)
   (Proyecto de Contexto listo para ChatGPT y Claude)
```

---

## 4. Tecnologías Seleccionadas

- **Frontend:** React 18+, TypeScript y Vite.
- **Estilos:** Tailwind CSS.
- **Alojamiento Web:** GitHub Pages (distribución de cliente estático).
- **Backend / Proxy de Seguridad (Propuesto):** Cloudflare Workers (ejecución serverless para proteger claves de API).
- **Modelos de IA Integrados:** OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet) y Google (Gemini 1.5).
- **Validación de Datos:** JSON Schema (Draft 2020-12).
- **Empaquetado:** JSZip y FileSaver en el navegador.

---

## 5. Módulos Principales del Sistema

| Código | Módulo | Propósito Principal |
| :---: | :--- | :--- |
| **MOD-01** | [Gestión de Negocios](nucleo/04_MODULOS.md#mod-01-gestión-de-negocios) | Captura de datos, validación y administración de perfiles. |
| **MOD-02** | [Generación del Núcleo Empresarial](nucleo/04_MODULOS.md#mod-02-generación-del-núcleo-empresarial) | Producción de los documentos base de negocio e identidad. |
| **MOD-03** | [Instrucciones de Imágenes Publicitarias](nucleo/04_MODULOS.md#mod-03-generación-de-instrucciones-para-imágenes-publicitarias) | Briefs técnicos y prompts de diseño para flyers y banners. |
| **MOD-04** | [Campañas y Textos Publicitarios](nucleo/04_MODULOS.md#mod-04-generación-de-campañas-y-textos-publicitarios) | Marcos de copywriting (AIDA, PAS) y copys para anuncios y redes. |
| **MOD-05** | [Ideas y Guiones de Videos](nucleo/04_MODULOS.md#mod-05-generación-de-ideas-y-guiones-de-videos) | Conceptos, guiones escena por escena y storyboards para video. |
| **MOD-06** | [Integración de Proveedores de IA](nucleo/04_MODULOS.md#mod-06-gestión-e-integración-de-proveedores-de-ia) | Conexión segura con OpenAI, Anthropic y Google. |
| **MOD-07** | [Exportación y Gestión de Archivos](nucleo/04_MODULOS.md#mod-07-exportación-y-gestión-de-archivos) | Empaquetado ZIP, descargas y futura sincronización con GitHub. |

---

## 6. Estructura del Repositorio

```text
ContextStudio-IA/
│
├── README.md                      # Presentación general e índice de navegación
├── .gitignore                     # Configuración de exclusiones de Git (incluye .env)
├── AGENTS.md                      # Directrices obligatorias para agentes de IA
│
├── nucleo/                        # Documentación fundacional de la plataforma
│   ├── 00_PROPOSITO.md            # Visión, objetivos y definición de proyecto de contexto
│   ├── 01_ARQUITECTURA.md         # Pila tecnológica, capas y diagrama Mermaid
│   ├── 02_REGLAS_GENERALES.md     # Políticas de fidelidad de datos y cero alucinación
│   ├── 03_ESTRUCTURA_SALIDA.md    # Estándar de árbol de directorios generado por negocio
│   └── 04_MODULOS.md              # Especificación detallada de los módulos MOD-01 al 07
│
├── plantillas/                    # Modelos maestros de generación de documentos
│   ├── negocio/
│   │   └── 00_NEGOCIO.md          # Plantilla del núcleo empresarial
│   ├── identidad/
│   │   └── 01_IDENTIDAD_VISUAL.md # Plantilla de tono y colorimetría
│   ├── flyers/
│   │   └── GENERADOR_FLYERS.md    # Plantilla para piezas gráficas y banners
│   ├── campanas/
│   │   └── GENERADOR_CAMPANAS.md  # Plantilla para anuncios y copywriting
│   └── videos/
│       ├── GENERADOR_IDEAS_VIDEO.md # Plantilla de conceptos audiovisuales
│       ├── GENERADOR_GUIONES.md     # Plantilla de guion técnico escena por escena
│       └── GENERADOR_STORYBOARD.md  # Plantilla de desglose de planos y prompts de video
│
├── esquemas/
│   └── negocio.schema.json        # Esquema formal JSON Schema Draft 2020-12
│
├── ejemplos/
│   └── negocio.demo.json          # Datos de ejemplo ficticios validados
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
| **02** | Modelo de datos y motor de generación | Tipos TypeScript, motor de plantillas y pruebas unitarias | *Pendiente* |
| **03** | Interfaz React y UX | Formularios interactivos, previsualizador Markdown y estilos Tailwind | *Pendiente* |
| **04** | Backend e integración inicial de IA | Cloudflare Workers, proxy seguro y conexión con proveedores | *Pendiente* |
| **05** | Generadores publicitarios y audiovisuales | Módulos de flyers, campañas, guiones y storyboards | *Pendiente* |
| **06** | Exportación, historial e integración con GitHub | Descarga ZIP, gestión de perfiles locales y sincronización remota | *Pendiente* |
| **07** | Despliegue, pruebas y estabilización | Publicación en GitHub Pages, pruebas E2E y release v1.0 | *Pendiente* |

Para un desglose pormenorizado de actividades y criterios de aceptación, consulta el documento [docs/ROADMAP.md](docs/ROADMAP.md).

---

## 8. Documentación de Referencia

- [Propósito y Visión General](nucleo/00_PROPOSITO.md)
- [Arquitectura Técnica Propuesta](nucleo/01_ARQUITECTURA.md)
- [Reglas Generales de Generación](nucleo/02_REGLAS_GENERALES.md)
- [Estructura del Proyecto de Salida](nucleo/03_ESTRUCTURA_SALIDA.md)
- [Catálogo de Módulos Funcionales](nucleo/04_MODULOS.md)
- [Registro de Decisiones de Arquitectura (ADR)](docs/DECISIONES.md)
- [Directrices para Agentes de IA](AGENTS.md)

---

## 9. Próximos Pasos

El siguiente hito del proyecto corresponde a la **Fase 02: Modelo de datos y motor de generación**, la cual abarcará:
1. Configuración de TypeScript y derivación de tipos a partir de [esquemas/negocio.schema.json](esquemas/negocio.schema.json).
2. Creación del motor de renderizado de plantillas Markdown.
3. Suite de pruebas automatizadas para verificar que la inyección de variables cumpla con las reglas de cero alucinación.
