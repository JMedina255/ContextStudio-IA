# 03. Estructura de Salida de Proyectos Generados — ContextStudio IA

---

## 1. Visión General de la Salida

Cuando un usuario completa la configuración de su negocio en ContextStudio IA y solicita la generación, la plataforma produce un directorio raíz con el nombre del negocio (o su slug normalizado). Este paquete representa el **Proyecto de Contexto Empresarial**, listo para ser consumido por herramientas de IA o almacenado en el repositorio del cliente.

> [!IMPORTANT]
> **Distinción entre plantillas y artefactos de salida:**
> Las plantillas ubicadas en el directorio `plantillas/` de este repositorio son **modelos abstractos de ingeniería de prompts** con variables de sustitución (ej. `{{nombre_negocio}}`). En contraste, los archivos detallados en este documento son **documentos concretos e individualizados** con datos reales validados del negocio, generados para producción.

---

## 2. Árbol de Directorios del Proyecto Generado

Un proyecto completo (con todos los módulos habilitados) presenta la siguiente estructura:

```text
Nombre-Negocio/
│
├── README.md                     # Índice general del contexto y guía de uso
├── INSTRUCCIONES_CHATGPT.md      # Instrucciones de sistema para Custom GPTs y Claude Projects
│
├── nucleo/                       # Documentación fundamental del negocio (Invariable)
│   ├── 00_NEGOCIO.md             # Perfil, modelo comercial, contactos y público
│   ├── 01_IDENTIDAD_VISUAL.md    # Colores, tipografías, tono y directrices de marca
│   ├── 02_PRODUCTOS_SERVICIOS.md # Catálogo de ofertas, descripciones y precios oficiales
│   └── 03_REGLAS_GENERALES.md    # Restricciones y directrices éticas específicas del negocio
│
├── generadores/                  # Módulos operativos según selección de usuario
│   ├── FLYERS.md                 # Generador de briefs y prompts para piezas gráficas
│   ├── PUBLICACIONES.md          # Generador de copys y posts para redes sociales
│   ├── CAMPAÑAS.md               # Generador de campañas publicitarias multicanal
│   ├── IDEAS_VIDEO.md            # Generador de conceptos y ángulos para videos cortos
│   ├── GUIONES_VIDEO.md          # Generador de guiones audiovisuales escena por escena
│   └── STORYBOARD.md             # Generador de desglose de planos y prompts de video
│
└── recursos/                     # Directorio de apoyo y activos complementarios
    └── README.md                 # Guía sobre dónde alojar logos, manuales de marca o PDFs
```

---

## 3. Reglas de Generación Condicional por Módulos

El usuario tiene la facultad de habilitar o deshabilitar módulos durante la configuración. El motor de generación aplica las siguientes reglas de inclusión:

| Módulo Seleccionado | Archivos Generados en la Salida | Condición |
| :--- | :--- | :--- |
| **MOD-01 / MOD-02: Núcleo Empresarial** | `README.md`<br>`INSTRUCCIONES_CHATGPT.md`<br>`nucleo/00_NEGOCIO.md`<br>`nucleo/01_IDENTIDAD_VISUAL.md`<br>`nucleo/02_PRODUCTOS_SERVICIOS.md`<br>`nucleo/03_REGLAS_GENERALES.md`<br>`recursos/README.md` | **Obligatorio:** Siempre se genera como base de cualquier proyecto de contexto. |
| **MOD-03: Instrucciones de Imágenes** | `generadores/FLYERS.md` | Se genera si el usuario selecciona el módulo de flyers o banners gráficos. |
| **MOD-04: Campañas y Textos** | `generadores/CAMPAÑAS.md`<br>`generadores/PUBLICACIONES.md` | Se genera si el usuario activa el módulo de marketing y redes sociales. |
| **MOD-05: Ideas y Guiones Audiovisuales** | `generadores/IDEAS_VIDEO.md`<br>`generadores/GUIONES_VIDEO.md`<br>`generadores/STORYBOARD.md` | Se generan en conjunto o individualmente según las opciones audiovisuales activadas. |

> [!NOTE]
> Si el usuario no activa un módulo específico (por ejemplo, el módulo audiovisual), el directorio `generadores/` no contendrá los archivos de video correspondientes, evitando archivos residuales o vacíos en el paquete final.

---

## 4. Estándares de los Archivos Generados

1. **Autonomía y Enlaces Relativos:** Cada archivo debe ser comprensible por sí mismo, pero mantener enlaces relativos funcionales hacia `../nucleo/00_NEGOCIO.md` o documentos hermanos para que los agentes de IA que navegan por el sistema de archivos puedan saltar entre referencias de forma autónoma.
2. **Encabezado Estandarizado:** Cada archivo generado debe comenzar con metadatos descriptivos en formato Markdown o bloque YAML:
   ```markdown
   # Nombre del Documento — [Nombre Comercial]
   > Proyecto de Contexto Generado por ContextStudio IA
   > Versión: 1.0.0 | Fecha: AAAA-MM-DD
   ```
3. **Instrucciones Claras para la IA Receptora:** Cada archivo en `generadores/` debe incluir una sección inicial titulada `## Modo de Uso con tu Asistente de IA`, que indique exactamente qué prompt copiar y pegar o cómo adjuntar el archivo a Claude Projects / ChatGPT.
