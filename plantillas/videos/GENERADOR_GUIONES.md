# Plantilla del Generador de Guiones de Video — GENERADOR_GUIONES.md

---

## 1. Propósito de la Plantilla

Definir las directrices y la estructura técnica para el generador `generadores/GUIONES_VIDEO.md`. Este documento estandariza la producción de guiones audiovisuales divididos en escenas, detallando tiempos exactos, descripción visual, narración en off (voz en off) o diálogo frente a cámara, textos sobreimpresos en pantalla (on-screen text) y llamados a la acción verificados.

---

## 2. Datos Requeridos

- Nombre comercial, producto o servicio específico a presentar.
- Concepto o idea seleccionada (idealmente proveniente de `generadores/IDEAS_VIDEO.md`).
- Tono de voz institucional (`nucleo/01_IDENTIDAD_VISUAL.md`).
- Duración total esperada (ej. 30, 45 o 60 segundos).
- Datos de contacto y destino del CTA (`nucleo/00_NEGOCIO.md`).

---

## 3. Variables de Entrada

- `{{nombre_negocio}}`: Nombre oficial de la empresa.
- `{{rubro}}`: Sector o industria.
- `{{tono_voz}}`: Estilo y cadencia de la locución (enérgico, sereno, técnico, cercano).
- `{{contacto_cta}}`: Destino del llamado a la acción (WhatsApp, link en bio, web).

---

## 4. Estructura del Archivo Esperado

El motor de generación debe producir un archivo con la siguiente estructura:

```markdown
# Generador de Guiones Audiovisuales — {{nombre_negocio}}

> Módulo Operativo de Guionismo y Producción | Proyecto generado con ContextStudio IA
> Referencias obligatorias: nucleo/00_NEGOCIO.md y nucleo/01_IDENTIDAD_VISUAL.md

---

## 1. Modo de Uso con tu Asistente de IA
Para redactar un guion escena por escena, solicita a tu asistente:
> *"Redacta un guion audiovisual de [30 / 45 / 60] segundos para [Reels / TikTok / Comercial] sobre [Tema o Producto], respetando el formato de tabla técnica de este documento y el tono de voz de la marca."*

---

## 2. Pautas Técnicas de Escritura
- **Tono de Locución:** {{tono_voz}}
- **Velocidad de Lectura Promedio:** 2.5 palabras por segundo (130-150 palabras por minuto).
  - *Guion de 30 segundos:* Entre 65 y 75 palabras de narración total.
  - *Guion de 60 segundos:* Entre 130 y 145 palabras de narración total.
- **Canal de Cierre (CTA):** {{contacto_cta}}

---

## 3. Formato Estándar de Guion Escena por Escena

Todo guion generado debe presentarse en el siguiente formato técnico estructurado:

### Ficha Técnica
- **Título del Video:** [Título atractivo]
- **Duración Estimada:** [ej. 30 segundos]
- **Objetivo Comercial:** [ej. Agendamiento de citas]
- **Locutor / Personaje:** [ej. Voz en off profesional / Fundador a cámara]

### Tabla de Guion Técnico

| Escena | Tiempo (s) | Descripción Visual / Plano | Audio (Diálogo o Voz en Off) | Texto en Pantalla (Gráficos) |
| :---: | :---: | :--- | :--- | :--- |
| **01 (Hook)** | 00 - 03s | Primer plano de [Situación problemática o acción rápida de impacto]. | *"¿Cansado de [problema común]? Esto te interesa."* | "¿Aún con este problema?" (Letras grandes en negrita) |
| **02** | 03 - 10s | Plano medio mostrando [Detalle o causa del problema]. | *"La mayoría comete el error de [error habitual], pero hay una forma mejor."* | "El error que casi todos cometen ⚠️" |
| **03** | 10 - 20s | Demostración visual de [Producto/Servicio de {{nombre_negocio}} en acción]. | *"En {{nombre_negocio}} diseñamos [solución], con [beneficio clave 1] y [beneficio clave 2]."* | Beneficio 1 / Beneficio 2 (Iconos de check) |
| **04** | 20 - 25s | Cliente satisfecho utilizando el servicio o toma del producto final terminado. | *"Resultados reales, sin complicaciones y con respaldo garantizado."* | "Calidad garantizada ⭐⭐⭐⭐⭐" |
| **05 (CTA)** | 25 - 30s | Pantalla de cierre con logotipo de {{nombre_negocio}}, colores corporativos y canal de contacto. | *"Escríbenos al enlace de nuestro perfil y comienza hoy mismo."* | "👉 {{contacto_cta}}" / Logotipo |
```

---

## 5. Reglas Específicas de Generación

1. **Ajuste estricto de duración:** El conteo de palabras del diálogo debe coincidir rigurosamente con los segundos asignados a cada escena.
2. **Textos en pantalla concisos:** Los textos sobreimpresos no deben superar 6 palabras por escena para garantizar lectura ágil en dispositivos móviles.

---

## 6. Restricciones

- Prohibido generar guiones con diálogos sobrecargados o imposibles de articular en el tiempo asignado.
- No incluir música comercial con copyright restringido; recomendar descriptores de estado de ánimo (ej. "Música instrumental upbeat, ritmo ágil").

---

## 7. Criterios de Validación

- Presencia de todas las columnas en la tabla técnica (Escena, Tiempo, Visual, Audio, Texto).
- Coherencia total entre el tiempo acumulado de las escenas y la duración total declarada.
