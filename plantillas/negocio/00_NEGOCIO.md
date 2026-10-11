# Plantilla Base: Núcleo del Negocio — 00_NEGOCIO.md

---

## 1. Propósito de la Plantilla

Definir la estructura y los parámetros de generación para el documento maestro `nucleo/00_NEGOCIO.md` dentro del proyecto de contexto empresarial. Este documento concentra los datos esenciales de la organización: razón de ser, modelo operativo, datos de contacto verificados, catálogo de productos y servicios, y definición de la audiencia objetivo.

---

## 2. Datos Requeridos

- Identificador / Slug del negocio.
- Nombre comercial oficial.
- Rubro / Industria.
- Descripción general y propuesta de valor.
- Canales de contacto verificados (teléfono, email, WhatsApp, sitio web).
- Ubicación física o alcance territorial.
- Catálogo de productos y/o servicios con detalles y beneficios.
- Perfil del público objetivo (segmentación demográfica y psicográfica, problemas que resuelve).
- Objetivos comerciales principales.

---

## 3. Variables de Entrada

- `{{slug_negocio}}`: Identificador alfanumérico normalizado.
- `{{nombre_negocio}}`: Nombre comercial del negocio.
- `{{rubro}}`: Sector económico e industria.
- `{{descripcion_negocio}}`: Resumen operativo y propuesta de valor.
- `{{mision}}`: Misión de la empresa (si está provista).
- `{{vision}}`: Visión a mediano/largo plazo (si está provista).
- `{{direccion}}`: Dirección física o indicación de operación 100% digital.
- `{{ciudad_pais}}`: Ciudad y país de operación principal.
- `{{telefono}}`: Teléfono oficial de atención.
- `{{email}}`: Correo electrónico oficial.
- `{{whatsapp}}`: Enlace o número de WhatsApp Business.
- `{{sitio_web}}`: URL del sitio web oficial.
- `{{tabla_productos_servicios}}`: Tabla Markdown estructurada con ofertas, características y precios oficiales.
- `{{perfil_audiencia}}`: Descripción detallada del cliente ideal o buyer persona.
- `{{metas_comerciales}}`: Lista de objetivos de negocio a alcanzar con el contexto.

---

## 4. Estructura del Archivo Esperado

El motor de generación debe producir un archivo con la siguiente estructura:

```markdown
# Núcleo del Negocio — {{nombre_negocio}}

> Documento oficial de contexto empresarial | Proyecto generado con ContextStudio IA
> Última actualización: {{fecha_generacion}}

---

## 1. Resumen Ejecutivo
- **Nombre Comercial:** {{nombre_negocio}}
- **Rubro / Industria:** {{rubro}}
- **Propuesta de Valor:** {{descripcion_negocio}}

### Misión
{{mision}}

### Visión
{{vision}}

---

## 2. Ubicación y Cobertura Operativa
- **Sede Principal:** {{direccion}}
- **Ciudad y País:** {{ciudad_pais}}

---

## 3. Canales Oficiales de Contacto
- **Teléfono:** {{telefono}}
- **WhatsApp:** {{whatsapp}}
- **Correo Electrónico:** {{email}}
- **Sitio Web:** {{sitio_web}}

> *Nota de seguridad para el Asistente de IA: No proporcionar ni inventar ningún canal de contacto alternativo a los expresamente listados arriba.*

---

## 4. Catálogo de Productos y Servicios
{{tabla_productos_servicios}}

---

## 5. Público Objetivo (Cliente Ideal)
{{perfil_audiencia}}

---

## 6. Objetivos Comerciales y Prioridades
{{metas_comerciales}}
```

---

## 5. Reglas Específicas de Generación

1. **Datos no suministrados:** Si campos como misión, visión o precios no fueron provistos en el formulario de origen, deben representarse explícitamente como `[No especificado por el usuario]` en lugar de redactar declaraciones inventadas.
2. **Canales de contacto literales:** Los números y correos deben mantenerse exactamente como fueron introducidos, respetando códigos de área.
3. **Formato tabular:** Los productos y servicios deben estructurarse en una tabla Markdown con columnas: `Nombre | Tipo | Descripción | Beneficio Principal | Precio Oficial`.

---

## 6. Restricciones

- Prohibido inferir precios con base en el rubro si el usuario no los especificó.
- Prohibido alterar el nombre comercial o añadir calificativos no oficiales (ej. convertir "Pastelería Ana" en "Pastelería Artesanal Gourmet Ana").

---

## 7. Criterios de Validación

- El archivo generado no debe contener variables vacías o sintaxis `{{...}}` sin procesar.
- El documento debe ser sintácticamente válido en Markdown estándar (GFM).
- Todos los canales de contacto deben coincidir exactamente con los del objeto validado de negocio.
