# 02. Reglas Generales de Generación — ContextStudio IA

---

## 1. Principio Rector: Fidelidad y Cero Alucinación

El propósito fundamental de ContextStudio IA es proporcionar contextos confiables, verificables y profesionales. Ningún generador ni modelo de IA integrado en la plataforma tiene autorización para fabricar información factual de una empresa.

> [!CAUTION]
> **Regla de Oro:** La generación nunca debe completar información empresarial inexistente como si fuera verdadera. Si un dato no ha sido provisto expresamente por el usuario o en el esquema de datos, el sistema no debe inventarlo bajo ninguna circunstancia.

---

## 2. Reglas Obligatorias de Generación

### Regla 01: Prioridad Absoluta de la Información Oficial
Toda información suministrada por el usuario a través de los formularios o esquemas oficiales (`esquemas/negocio.schema.json`) tiene prevalencia total sobre cualquier conocimiento previo del modelo de lenguaje. La IA debe ceñirse a los límites de dicha información.

### Regla 02: Prohibición Estricta de Datos Falsos
Queda terminantemente prohibido inventar:
- Números de teléfono, prefijos internacionales, cuentas de WhatsApp o correos de contacto.
- Direcciones físicas, ciudades, códigos postales o ubicaciones ficticias.
- Precios, planes tarifarios, descuentos, monedas o condiciones de pago no estipuladas.
- Certificaciones técnicas, garantías, alianzas comerciales, nombres de socios o fundadores no mencionados.
- Especificaciones técnicas, ingredientes o funcionalidades inexistentes en los productos/servicios.

### Regla 03: Tratamiento de Datos Faltantes o Desconocidos
Cuando un dato opcional o relevante no haya sido suministrado por el usuario, el generador debe aplicar una de las siguientes estrategias formales:
1. **Omitir la sección:** Si la información no es imprescindible para la comprensión del documento.
2. **Marcador de posición explícito:** Si la estructura requiere la presencia del campo para mantener la integridad de la plantilla, se utilizará una etiqueta reconocible:
   - `[No especificado]`
   - `[Pendiente de definir por el usuario]`
   - `[Información no provista]`
3. **Instrucción de consulta:** Si la IA ejecutora requiere el dato en tiempo de ejecución, se instruirá explícitamente: *"Solicitar este dato al usuario antes de proceder"*.

### Regla 04: Conservación de Identidad de Marca y Nombres Comerciales
- Los nombres comerciales, marcas registradas, nombres de productos y eslóganes deben reproducirse con su ortografía, mayúsculas y acentuación original exacta.
- Los códigos hexadecimales de color, nombres de tipografías y directrices de estilo deben mantenerse inalterados respecto a lo definido en el módulo de identidad visual.

### Regla 05: Separación de Instrucciones Generales y Específicas
- **Instrucciones generales:** Residen exclusivamente en los documentos de núcleo (`00_NEGOCIO.md`, `01_IDENTIDAD_VISUAL.md`, `03_REGLAS_GENERALES.md`). Definen quién es la empresa, qué valores defiende y cuál es su tono global.
- **Instrucciones específicas:** Pertenecen a los generadores correspondientes (`FLYERS.md`, `CAMPAÑAS.md`, `GUIONES_VIDEO.md`). Se enfocan únicamente en la técnica, formato, métricas y entregables de esa disciplina.

### Regla 06: Reutilización de Información Común (DRY)
Los generadores no deben duplicar manualmente la descripción completa del negocio o las tablas de productos. En su lugar, deben:
- Hacer referencia cruzada a los archivos de núcleo: *"Consultar `nucleo/00_NEGOCIO.md` para catálogo y valores"*.
- Garantizar que una actualización en el núcleo se propague conceptualmente a todos los generadores.

### Regla 07: Compatibilidad Universal de Archivos Markdown
Todos los documentos producidos deben cumplir con los estándares de **GitHub Flavored Markdown (GFM)**:
- Encabezados estructurados jerárquicamente (`#`, `##`, `###`) sin saltos de nivel arbitrarios.
- Tablas estándar con separadores limpios.
- Enlaces relativos funcionales basados en la estructura del proyecto generado.
- Uso de bloques de código cercados con especificación de lenguaje (` ```markdown `, ` ```json `, etc.).
- Sin dependencias de sintaxis propietarias o HTML complejo no estándar.

### Regla 08: Convenciones de Nomenclatura
- **Archivos de plantillas:** Mayúsculas sostenidas para generadores (`GENERADOR_FLYERS.md`, `GENERADOR_GUIONES.md`) y prefijos numéricos para documentos secuenciales (`00_NEGOCIO.md`, `01_IDENTIDAD_VISUAL.md`).
- **Variables de sustitución:** Formato snake_case entre dobles llaves sin espacios internos: `{{nombre_negocio}}`, `{{rubro}}`, `{{publico_objetivo}}`.
- **Slugs de directorios:** Minúsculas y guiones sin caracteres especiales: `empresa-ejemplo/`.

### Regla 09: Privacidad, Seguridad y Confidencialidad
- Los proyectos de contexto no deben incluir información personal identificable (PII) de clientes finales ni contraseñas, claves privadas o tokens.
- Se debe advertir al usuario si introduce información sensible en campos de texto libre antes de generar los documentos finales.

### Regla 10: Validación del Contenido Generado
Antes de marcar un proyecto de contexto como completado, el sistema o motor de generación debe validar:
1. Que no existan variables sin resolver (ej. restos de `{{variable}}` sin sustituir).
2. Que la sintaxis Markdown sea íntegra y legible.
3. Que los archivos generados correspondan exactamente con los módulos seleccionados por el usuario.

### Regla 11: Control de Versiones y Modificaciones
Cada proyecto de contexto generado debe incluir en su metainformación de cabecera:
- Fecha de generación (formato ISO 8601 o YYYY-MM-DD).
- Versión del generador de ContextStudio IA utilizado.
- Advertencia sobre el mantenimiento y actualización del documento cuando cambien las condiciones comerciales del negocio.
