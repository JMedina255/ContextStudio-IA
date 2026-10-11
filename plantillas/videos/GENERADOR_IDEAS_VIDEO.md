# Plantilla del Generador de Ideas de Video — GENERADOR_IDEAS_VIDEO.md

---

## 1. Propósito de la Plantilla

Definir las directrices operativas para el generador `generadores/IDEAS_VIDEO.md`. Este documento guía a un modelo de IA en la formulación de conceptos creativos, ángulos narrativos y propuestas de contenido audiovisual adaptados a la realidad comercial de la empresa, su catálogo de productos y los diferentes formatos de difusión en video (Reels, TikTok, Shorts, videos corporativos o anuncios).

---

## 2. Datos Requeridos

- Nombre comercial, sector y propuesta de valor (`nucleo/00_NEGOCIO.md`).
- Catálogo de productos o servicios (`nucleo/02_PRODUCTOS_SERVICIOS.md`).
- Público objetivo, dudas recurrentes y motivos de compra.
- Plataformas de destino (TikTok, Instagram Reels, YouTube Shorts, YouTube largo, LinkedIn).
- Objetivos comerciales (educar, entretener, generar confianza, vender o viralizar).
- Duraciones objetivo (cortos: 15-30s, medios: 45-60s, largos: 2-5 min).

---

## 3. Variables de Entrada

- `{{nombre_negocio}}`: Nombre oficial de la empresa.
- `{{rubro}}`: Sector o industria comercial.
- `{{propuesta_valor}}`: Propuesta de valor y beneficios diferenciales.
- `{{productos_destacados}}`: Lista de productos o servicios prioritarios para promoción audiovisual.
- `{{publico_resumido}}`: Características psicográficas y dolores de la audiencia.
- `{{canales_video}}`: Plataformas de video prioritarias para el negocio.

---

## 4. Estructura del Archivo Esperado

El motor de generación debe producir un archivo con la siguiente estructura:

```markdown
# Generador de Ideas de Video y Conceptos Creativos — {{nombre_negocio}}

> Módulo Operativo Audiovisual | Proyecto generado con ContextStudio IA
> Referencias obligatorias: nucleo/00_NEGOCIO.md y nucleo/01_IDENTIDAD_VISUAL.md

---

## 1. Modo de Uso con tu Asistente de IA
Para generar una tanda de ideas de video, solicita a tu asistente:
> *"Proponme 5 conceptos de video para [Plataforma: TikTok/Reels] enfocados en promocionar [Producto/Servicio] con el objetivo [Educación / Venta directa / Autoridad], aplicando la matriz de este documento."*

---

## 2. Parámetros Base del Negocio
- **Empresa:** {{nombre_negocio}} ({{rubro}})
- **Propuesta Principal:** {{propuesta_valor}}
- **Ofertas Prioritarias:** {{productos_destacados}}
- **Audiencia Objetivo:** {{publico_resumido}}
- **Canales de Publicación:** {{canales_video}}

---

## 3. Pilares de Contenido Audiovisual

Todo concepto de video propuesto debe clasificarse en uno de los siguientes cuatro pilares estratégicos:

| Pilar | Propósito | Enfoque Narrativo | Formato Ideal |
| :--- | :--- | :--- | :--- |
| **Educativo / Utilidad** | Posicionar autoridad y resolver dudas frecuentes. | "3 errores comunes al...", "Cómo elegir el mejor...", tutoriales exprés. | 45-60 segundos |
| **Detrás de Cámaras / Humanización** | Generar confianza, cercanía y transparencia. | Procesos de elaboración, control de calidad, un día de trabajo del equipo. | 30-45 segundos |
| **Transformación / Testimonio** | Evidenciar resultados reales y casos de éxito. | Antes vs. después, historia de satisfacción de un cliente real. | 30-60 segundos |
| **Comercial / Promocional Directo** | Impulsar ventas y cierre de prospectos. | Presentación de producto, demostración en vivo, oferta por tiempo limitado. | 15-30 segundos |

---

## 4. Estructura de Cada Ficha de Idea Generada
Cada concepto de video desarrollado por la IA debe presentarse obligatoriamente bajo esta ficha técnica:

- **Título Conceptual:** Nombre corto y memorable de la idea.
- **Pilar Estratégico:** Educativo / Confianza / Transformación / Comercial.
- **Plataforma y Duración:** Ej. Instagram Reels (30 segundos).
- **Gancho Inicial (Primeros 3 segundos):** Qué se ve y qué se dice para frenar el scroll del usuario.
- **Desarrollo Central:** Resumen de 2-3 puntos o demostración que sostiene la atención.
- **Llamado a la Acción (CTA):** Acción precisa hacia el canal oficial de contacto de {{nombre_negocio}}.
```

---

## 5. Reglas Específicas de Generación

1. **Ganchos realistas:** Los ganchos no deben realizar afirmaciones escandalosas o engañosas que perjudiquen la reputación del negocio.
2. **Factibilidad técnica:** Proponer ideas que puedan grabarse con recursos razonables para una PyME (smartphone con buena iluminación o producción sencilla).

---

## 6. Restricciones

- Este generador no renderiza ni edita archivos de video; diseña la estrategia conceptual previa a la redacción del guion.

---

## 7. Criterios de Validación

- Correcta sustitución de variables corporativas.
- Integración completa de la matriz de pilares de contenido.
