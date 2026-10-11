# Plantilla Base: Identidad Visual y Tono de Marca — 01_IDENTIDAD_VISUAL.md

---

## 1. Propósito de la Plantilla

Definir las directrices gráficas, cromáticas, tipográficas y el tono de comunicación para el documento `nucleo/01_IDENTIDAD_VISUAL.md`. Su objetivo es proporcionar a los modelos de lenguaje y a los generadores operativos las restricciones estéticas indispensables para redactar y formular prompts de diseño respetando la personalidad de la marca.

---

## 2. Datos Requeridos

- Paleta cromática oficial (colores primarios, secundarios y de acento con códigos HEX).
- Tipografías corporativas (principales y secundarias).
- Tono y estilo de voz de la comunicación (formal, cercano, técnico, enérgico, etc.).
- Valores corporativos y personalidad de marca.
- Reglas de uso y preservación del logotipo e imagotipo.
- Pautas de estilo fotográfico e ilustración.

---

## 3. Variables de Entrada

- `{{nombre_negocio}}`: Nombre oficial de la empresa.
- `{{paleta_colores}}`: Lista estructurada de colores institucionales con código HEX, nombre del color y función de aplicación.
- `{{tipografias}}`: Familias tipográficas recomendadas para titulares y cuerpos de texto.
- `{{tono_voz}}`: Definición del tono comunicacional predominante y matices secundarios.
- `{{personalidad_marca}}`: Adjetivos clave y arquetipo de la marca.
- `{{pautas_fotograficas}}`: Estilo visual de imágenes (iluminación, composición, elementos humanos, fondos).
- `{{restricciones_esteticas}}`: Elementos visuales expresamente prohibidos o desaconsejados.

---

## 4. Estructura del Archivo Esperado

El motor de generación debe producir un archivo con la siguiente estructura:

```markdown
# Identidad Visual y Tono de Marca — {{nombre_negocio}}

> Guía de estilo y directrices creativas | Proyecto generado con ContextStudio IA
> Referencia central: nucleo/00_NEGOCIO.md

---

## 1. Personalidad y Tono de Voz
- **Tono Principal:** {{tono_voz}}
- **Atributos de Personalidad:** {{personalidad_marca}}
- **Tratamiento al Cliente:** (ej. Tuteo profesional, usted respetuoso, etc.)

> *Instrucción para el Asistente de IA: Redactar siempre manteniendo rigurosamente este tono en correos, copys de redes y guiones.*

---

## 2. Paleta Cromática Institucional
{{paleta_colores}}

---

## 3. Tipografía y Jerarquía Visual
{{tipografias}}

---

## 4. Estilo de Imagen y Fotografía
{{pautas_fotograficas}}

---

## 5. Restricciones y Reglas Negativas de Marca
{{restricciones_esteticas}}

> *Prohibido para la IA: Usar colores ajenos a la paleta oficial en prompts de diseño o generar textos con vocabulario discordante con la personalidad de la marca.*
```

---

## 5. Reglas Específicas de Generación

1. **Códigos HEX estrictos:** Los colores deben registrarse en formato `#RRGGBB` estándar. Si el usuario no especificó códigos exactos, pero aportó nombres de color (ej. "Azul marino y blanco"), se conservará la descripción literal sin fabricar códigos hex arbitrarios, marcándolos como `[Código HEX pendiente de confirmación]`.
2. **Coherencia con el núcleo:** La personalidad de marca debe armonizar con el público objetivo y la propuesta de valor definida en `00_NEGOCIO.md`.

---

## 6. Restricciones

- Prohibido inferir directrices de diseño radicalmente opuestas al rubro indicado.
- Prohibido omitir las restricciones negativas si el usuario proporcionó elementos desaconsejados.

---

## 7. Criterios de Validación

- Códigos cromáticos correctamente formateados si fueron provistos.
- Ausencia de variables sin sustitución (`{{...}}`).
- Coherencia directa con los atributos de marca del esquema de datos.
