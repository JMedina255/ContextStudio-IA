# Plantilla del Generador de Storyboards y Prompts de Video — GENERADOR_STORYBOARD.md

---

## 1. Propósito de la Plantilla

Definir las directrices y especificaciones para el generador `generadores/STORYBOARD.md`. Este documento estandariza la traducción de un guion audiovisual en un desglose visual cinematográfico: tipos de plano, movimientos de cámara, iluminación, ambientación, efectos de transición y prompts especializados para herramientas generativas de video con IA (Runway Gen-2/Gen-3, Pika Labs, Sora, Luma Dream Machine) o para dirección de fotografía humana.

---

## 2. Datos Requeridos

- Guion técnico escena por escena (proveniente de `generadores/GUIONES_VIDEO.md`).
- Directrices cromáticas y estéticas de la marca (`nucleo/01_IDENTIDAD_VISUAL.md`).
- Herramienta de producción prevista (grabación real con cámara o generación sintética con IA).
- Formato de aspecto (9:16 vertical para redes, 16:9 horizontal para pauta/web).

---

## 3. Variables de Entrada

- `{{nombre_negocio}}`: Nombre oficial de la empresa.
- `{{rubro}}`: Sector comercial.
- `{{estilo_visual}}`: Atmósfera, iluminación y lenguaje estético oficial de la marca.
- `{{colores_marca}}`: Paleta cromática corporativa.

---

## 4. Estructura del Archivo Esperado

El motor de generación debe producir un archivo con la siguiente estructura:

```markdown
# Generador de Storyboard y Prompts Audiovisuales — {{nombre_negocio}}

> Módulo Operativo de Dirección Visual | Proyecto generado con ContextStudio IA
> Referencias obligatorias: generadores/GUIONES_VIDEO.md y nucleo/01_IDENTIDAD_VISUAL.md

---

## 1. Modo de Uso con tu Asistente de IA
Para desglosar un guion en storyboard técnico o generar prompts de video con IA, indica a tu asistente:
> *"Transforma las escenas del guion [Título del Guion] en un storyboard técnico y genera los prompts de video para [Runway / Pika / Grabación real], aplicando la plantilla de este documento."*

---

## 2. Parámetros de Dirección de Arte
- **Empresa:** {{nombre_negocio}} ({{rubro}})
- **Atmósfera e Iluminación:** {{estilo_visual}}
- **Colores de Acento:** {{colores_marca}}

---

## 3. Matriz de Tipos de Plano y Movimientos de Cámara
- **Tipos de Plano:**
  - *Gran Plano General (EWS):* Establecimiento del entorno o locación.
  - *Plano Entero (FS):* Sujeto de cuerpo completo interactuando con el producto.
  - *Plano Medio (MS):* Presentador desde la cintura comunicando el mensaje central.
  - *Primer Plano (CU):* Expresión facial de alivio, sorpresa o satisfacción.
  - *Plano Detalle (ECU):* Enfoque macro en la textura, pantalla o uso específico del producto.
- **Movimientos de Cámara:**
  - *Static:* Cámara fija sobre trípode (máxima estabilidad y foco en el producto).
  - *Pan (Left/Right):* Barrido horizontal suave.
  - *Dolly In / Zoom In:* Acercamiento progresivo para acentuar dramatismo o relevancia.
  - *Tracking Shot:* Seguimiento dinámico al sujeto en movimiento.

---

## 4. Desglose de Storyboard Escena por Escena

Para cada escena del guion, se genera la siguiente ficha técnica:

### Plano #01 — [Nombre de la Escena / Hook]
- **Duración:** 3 segundos | **Aspect Ratio:** 9:16
- **Tipo de Plano:** Primer Plano (Close-Up).
- **Movimiento de Cámara:** Slow push-in hacia el sujeto.
- **Descripción de Escena:** Un usuario mira su teléfono con expresión de frustración en una oficina moderna y luminosa.
- **Iluminación y Ambiente:** Luz natural diurna difusa, tonos corporativos {{colores_marca}} presentes en elementos sutiles de fondo.
- **Transición a Siguiente Plano:** Corte seco dinámico (Hard cut).
- **Prompt para Generador de Video con IA (Runway / Pika / Sora):**
  ```text
  Cinematic close-up shot of a young professional looking stressed at smartphone screen, modern bright office interior background, soft diffused natural daylight, hyperrealistic 4k, smooth slow push-in camera motion, commercial video style --ar 9:16
  ```

---

## 5. Reglas de Continuidad y Consistencia Visual
1. **Consistencia de personajes y ambiente:** Si se utiliza IA generativa de video, mantener descriptores de vestimenta, iluminación y locación estables a lo largo de todos los planos.
2. **Espacio para tipografía:** Prever áreas de encuadre limpias (espacio negativo) en los planos donde el guion indique textos sobreimpresos.
```

---

## 5. Reglas Específicas de Generación

1. **Prompts en inglés para herramientas de IA:** Los prompts específicos para motores de video (Runway, Pika, Midjourney, Sora) deben formularse en inglés técnico, ya que los modelos responden con mayor fidelidad a dicha sintaxis.
2. **Descripciones descriptivas en español:** Las explicaciones de ambientación y movimientos deben permanecer en español claro para los directores humanos.

---

## 6. Restricciones

- Este documento no produce renderizados de video directamente; define la planificación visual para producción.

---

## 7. Criterios de Validación

- Inclusión de parámetros cinematográficos (plano, movimiento, iluminación, transición).
- Correcta especificación de relación de aspecto y tiempo por plano.
