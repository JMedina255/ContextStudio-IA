# Plantilla del Generador de Campañas Publicitarias — GENERADOR_CAMPANAS.md

---

## 1. Propósito de la Plantilla

Definir la estructura de instrucciones operativas para el generador `generadores/CAMPAÑAS.md`. Su objetivo es guiar a los modelos de lenguaje en la conceptualización, estructuración y redacción de campañas publicitarias multicanal (Meta Ads, Google Ads, LinkedIn Ads, Email Marketing) y textos persuasivos alineados estrictamente con los objetivos comerciales y el público objetivo de la empresa.

---

## 2. Datos Requeridos

- Nombre comercial y descripción de la propuesta de valor.
- Público objetivo detallado (dolores, motivaciones, objeciones comunes).
- Catálogo de productos o servicios protagonistas de la campaña.
- Tono de voz y pautas comunicacionales (`nucleo/01_IDENTIDAD_VISUAL.md`).
- Objetivos de conversión (captación de leads, ventas directas, tráfico o posicionamiento de marca).
- Canales publicitarios de difusión previstos.

---

## 3. Variables de Entrada

- `{{nombre_negocio}}`: Nombre oficial de la empresa.
- `{{rubro}}`: Sector o industria.
- `{{propuesta_valor}}`: Propuesta única de venta (USP).
- `{{publico_resumido}}`: Características y puntos de dolor clave de la audiencia.
- `{{tono_comunicacion}}`: Tono de voz oficial establecido.
- `{{llamadas_accion}}`: Canales de conversión autorizados (WhatsApp, formulario web, llamada telefónica).

---

## 4. Estructura del Archivo Esperado

El motor de generación debe producir un archivo con la siguiente estructura:

```markdown
# Generador de Campañas Publicitarias — {{nombre_negocio}}

> Módulo Operativo de Marketing y Copywriting | Proyecto generado con ContextStudio IA
> Referencias obligatorias: nucleo/00_NEGOCIO.md y nucleo/01_IDENTIDAD_VISUAL.md

---

## 1. Modo de Uso con tu Asistente de IA
Para planificar o redactar una campaña publicitaria, solicita a tu asistente:
> *"Diseña una campaña publicitaria enfocada en [Objetivo o Producto] para difundir en [Meta Ads / Google / LinkedIn], utilizando los marcos de copywriting de este documento."*

---

## 2. Parámetros Estratégicos de la Empresa
- **Negocio:** {{nombre_negocio}}
- **Propuesta de Valor:** {{propuesta_valor}}
- **Perfil de la Audiencia:** {{publico_resumido}}
- **Tono de Comunicación:** {{tono_comunicacion}}
- **Destino de Conversión Oficial:** {{llamadas_accion}}

---

## 3. Marcos de Copywriting Validados

### A. Marco AIDA (Atención, Interés, Deseo, Acción)
- **Atención (Hook):** Titular disruptivo que apela a un dolor o deseo urgente del cliente ideal.
- **Interés:** Contextualización del problema y presentación empática de la solución.
- **Deseo:** Evidencia de beneficios directos, diferenciadores de la marca y transformación lograda.
- **Acción (CTA):** Instrucción precisa hacia el canal oficial de contacto.

### B. Marco PAS (Problema, Agitación, Solución)
- **Problema:** Enunciación explícita de la dificultad que atraviesa la audiencia.
- **Agitación:** Exploración de las consecuencias de no solucionar el problema a tiempo.
- **Solución:** Presentación de {{nombre_negocio}} como la alternativa definitiva y confiable.

---

## 4. Estructura Estándar de Anuncio para Redes Sociales (Meta Ads)
1. **Gancho (Líneas 1-2):** Pregunta provocadora o estadística impactante (visible antes del "Ver más").
2. **Cuerpo del Mensaje (3-5 párrafos breves):** Desarrollo de beneficios mediante viñetas legibles.
3. **Respaldo Institucional Verificable:** Dato de confianza oficial y comprobable (ej. años de operación, certificaciones reales o método propio, sin inventar testimonios ni garantías no declaradas).
4. **Llamado a la Acción (CTA):** Enlace o indicación hacia el canal oficial (ej. WhatsApp).
5. **Título del Anuncio (Headline corto):** Máximo 5 palabras persuasivas.

---

## 5. Matriz de Objeciones y Respuestas Argumentadas
La IA debe neutralizar las objeciones habituales de la audiencia respetando las verdades del negocio:
- **Precio:** Enfatizar retorno de inversión, durabilidad o servicio postventa.
- **Confianza:** Resaltar trayectoria, profesionalismo y atención personalizada.
- **Urgencia:** Destacar disponibilidad de agenda o beneficios de iniciar oportunamente.
```

---

## 5. Reglas Específicas de Generación

1. **Prohibición de promesas falsas:** La IA nunca debe garantizar resultados milagrosos, retornos monetarios no demostrables o certificaciones inexistentes.
2. **Canales de contacto literales:** Todo CTA debe apuntar estrictamente a los canales confirmados en `00_NEGOCIO.md`.

---

## 6. Restricciones

- Prohibido utilizar tono sensacionalista ("clickbait") que degrade la credibilidad institucional de la empresa.

---

## 7. Criterios de Validación

- Correcta sustitución de variables.
- Claridad en las instrucciones para los asistentes de IA receptores.
