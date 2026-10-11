# Directorio de Especificaciones de Plantillas — ContextStudio IA

Este directorio alberga las **especificaciones formales de plantillas** de ContextStudio IA.

---

## Diferencia entre Especificaciones y Plantillas Ejecutables

Para mantener una separación clara entre documentación de arquitectura y código de ejecución:

| Tipo | Ubicación | Función y Características |
| :--- | :--- | :--- |
| **Especificaciones de Plantillas** | `plantillas/` (este directorio) | Documentos Markdown descriptivos que definen propósito, datos requeridos, variables de entrada, reglas de generación, restricciones y criterios de validación de cada tipo de archivo. Sirven como contrato funcional de ingeniería de prompts. |
| **Plantillas Ejecutables** | `packages/core/templates/` (y su bundle compilado `packages/core/src/templates/bundle.ts`) | Archivos con sintaxis Handlebars (`.hbs`) optimizados para ser procesados determinísticamente por el motor `@contextstudio/core` en memoria, sin dependencias de I/O de disco ni llamadas al sistema de archivos en el navegador. |

---

## Catálogo de Especificaciones

1. **Núcleo de Negocio:**
   - [`negocio/00_NEGOCIO.md`](negocio/00_NEGOCIO.md): Especificación del resumen institucional, contactos y catálogo básico.
2. **Identidad Visual:**
   - [`identidad/01_IDENTIDAD_VISUAL.md`](identidad/01_IDENTIDAD_VISUAL.md): Especificación de paleta de colores, tipografías y tono de voz.
3. **Piezas Gráficas:**
   - [`flyers/GENERADOR_FLYERS.md`](flyers/GENERADOR_FLYERS.md): Especificación de directrices de diseño y prompts para imágenes.
4. **Campañas Publicitarias:**
   - [`campanas/GENERADOR_CAMPANAS.md`](campanas/GENERADOR_CAMPANAS.md): Especificación de copys y marcos AIDA / PAS.
5. **Producción Audiovisual:**
   - [`videos/GENERADOR_IDEAS_VIDEO.md`](videos/GENERADOR_IDEAS_VIDEO.md): Especificación de conceptos y pilares de video.
   - [`videos/GENERADOR_GUIONES.md`](videos/GENERADOR_GUIONES.md): Especificación de guion técnico escena por escena.
   - [`videos/GENERADOR_STORYBOARD.md`](videos/GENERADOR_STORYBOARD.md): Especificación de encuadres, planos cinematográficos y prompts de video.
