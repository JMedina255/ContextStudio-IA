# Plantilla del Generador de Flyers y Banners — GENERADOR_FLYERS.md

---

## 1. Propósito de la Plantilla

Definir el marco de instrucciones operativas para el generador `generadores/FLYERS.md`. Este documento guía a un asistente de IA o a un diseñador en la formulación de briefs técnicos, jerarquías visuales y prompts para herramientas de generación de imágenes (Midjourney, DALL-E 3, Stable Diffusion) destinados a piezas publicitarias estáticas (flyers impresos, banners para pauta web e historias de redes sociales).

---

## 2. Datos Requeridos

- Nombre comercial y rubro.
- Referencias cromáticas y tipográficas oficiales (extraídas de `nucleo/01_IDENTIDAD_VISUAL.md`).
- Datos de contacto y llamados a la acción verificados (extraídos de `nucleo/00_NEGOCIO.md`).
- Formatos y proporciones requeridas (ej. 1:1 feed, 9:16 historias/reels, A5 impreso).
- Objetivos de comunicación (lanzamiento, promoción especial, evento o posicionamiento).

---

## 3. Variables de Entrada

- `{{nombre_negocio}}`: Nombre oficial de la empresa.
- `{{rubro}}`: Sector o industria.
- `{{paleta_resumida}}`: Resumen de colores corporativos obligatorios.
- `{{contactos_resumidos}}`: Teléfono, WhatsApp, sitio web o redes oficiales que deben aparecer en la pieza.
- `{{directrices_diseno}}`: Pautas de diagramación y estilo visual aprobadas.

---

## 4. Estructura del Archivo Esperado

El motor de generación debe producir un archivo con la siguiente estructura:

```markdown
# Generador de Flyers y Piezas Gráficas — {{nombre_negocio}}

> Módulo Operativo de Diseño Gráfico | Proyecto generado con ContextStudio IA
> Referencias obligatorias: nucleo/00_NEGOCIO.md y nucleo/01_IDENTIDAD_VISUAL.md

---

## 1. Instrucciones de Uso para tu Asistente de IA
Para generar un brief o prompt de flyer, indica a tu asistente:
> *"Genera la estructura de un flyer para [Producto o Evento] con el objetivo [Venta / Lanzamiento / Información], aplicando las directrices de este documento."*

---

## 2. Parámetros Fijos de Marca
- **Marca:** {{nombre_negocio}} ({{rubro}})
- **Colores Obligatorios:** {{paleta_resumida}}
- **Datos de Contacto a Incluir:** {{contactos_resumidos}}

---

## 3. Estructura Estándar de una Pieza Gráfica
Todo flyer o banner generado debe contemplar la siguiente distribución jerárquica:

1. **Zona Superior (Gancho Visual y Encabezado):**
   - Logotipo de la marca en zona segura.
   - Titular de alto impacto (máximo 7 palabras) enfocado en el beneficio del cliente.
2. **Zona Central (Imagen Principal y Propuesta de Valor):**
   - Fotografía del producto o ilustración descriptiva de alta calidad.
   - Subtítulo explicativo o lista de hasta 3 beneficios clave.
3. **Zona Inferior (Llamado a la Acción y Contacto):**
   - Botón visual de Llamado a la Acción (CTA) claro (ej. "Agenda tu cita hoy", "Visita nuestra tienda").
   - Canales oficiales verificados (WhatsApp / Sitio web).

---

## 4. Generador de Prompts para Herramientas de IA (DALL-E 3 / Midjourney)
Cuando se soliciten prompts para generar el fondo o la imagen central, la IA debe estructurarlos con la siguiente fórmula:

```text
[Sujeto o escena principal centrada en el producto/servicio], [estilo fotográfico o de ilustración corporativo], [paleta de colores: {{paleta_resumida}}], [iluminación profesional], clean composition, space for text overlay, photorealistic, 8k resolution, professional advertising photography --ar [1:1 / 9:16 / 16:9]
```

---

## 5. Matriz de Formatos Frecuentes
| Formato | Relación de Aspecto | Resolución Sugerida | Uso Principal |
| :--- | :--- | :--- | :--- |
| Cuadrado | 1:1 | 1080 x 1080 px | Feed de Instagram / Facebook |
| Vertical | 9:16 | 1080 x 1920 px | Historias de Instagram / WhatsApp / TikTok |
| Horizontal | 16:9 / 1.91:1 | 1200 x 628 px | Banners web / Anuncios de Meta Ads |
| Impreso | Formato A5 / Media Carta | 300 DPI | Impresión física / Volantes de mostrador |
```

---

## 5. Reglas Específicas de Generación

1. **Prohibición de textos sobrecargados:** Instruir a la IA a priorizar la legibilidad visual y evitar bloques densos de texto en piezas publicitarias.
2. **Validación de llamadas a la acción:** Los llamados a la acción deben utilizar únicamente los canales de contacto estipulados en el archivo de negocio.

---

## 6. Restricciones

- Este documento no genera el archivo gráfico renderizado; define las especificaciones técnicas para que una IA generadora de imágenes o un diseñador gráfico produzca la pieza.
- Queda prohibido añadir logotipos o marcas de terceros sin autorización.

---

## 7. Criterios de Validación

- Correcta inyección de las variables de identidad visual y contactos.
- Inclusión del descargo de responsabilidad sobre la generación de instrucciones y no de archivos binarios de imagen.
