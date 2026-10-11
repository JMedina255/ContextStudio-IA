# 00. Propósito y Visión General del Sistema — ContextStudio IA

---

## 1. Descripción General del Sistema

**ContextStudio IA** es una plataforma web modular diseñada para orquestar, estructurar y generar de manera automatizada **proyectos de contexto empresarial estandarizados** en formato Markdown, optimizados para alimentar herramientas de inteligencia artificial generativa (como ChatGPT, Claude de Anthropic, Google Gemini y agentes autónomos).

La plataforma permite a dueños de negocios, agencias de marketing, consultores y creadores ingresar datos verificables de una empresa a través de una interfaz interactiva y flexible. Posteriormente, mediante plantillas de ingeniería de contexto e integraciones con modelos de lenguaje avanzados, produce una arquitectura documental coherente que dota a las IA de todo el conocimiento corporativo, tono de voz, catálogo de ofertas, directrices de marca y generadores operativos específicos.

---

## 2. Definición: Plataforma Generadora vs. Proyecto de Contexto Empresarial

Para evitar confusiones conceptuales a lo largo de todo el ciclo de vida del software, se establece la siguiente distinción formal:

| Concepto | Definición | Naturaleza Técnica |
| :--- | :--- | :--- |
| **Plataforma Generadora (ContextStudio IA)** | La aplicación de software compuesta por frontend (React/TypeScript/Vite), backend proxy (Cloudflare Workers), esquemas de validación y motor de plantillas que procesa entradas de usuario y orquesta llamadas a APIs de IA. | Aplicación web / Sistema de software. |
| **Proyecto de Contexto Empresarial (Salida)** | El conjunto estructurado de archivos Markdown generados para un negocio particular (ej. `Nombre-Negocio/nucleo/`, `Nombre-Negocio/generadores/`), empaquetado como repositorio o archivo ZIP. Sirve como base de conocimiento y conjunto de instrucciones para proyectos de ChatGPT, Claude Projects, o bases de datos de contexto de agentes. | Artefacto de datos y documentación producida. |

---

## 3. Problema que Pretende Solucionar

El uso actual de modelos de lenguaje en contextos corporativos sufre de deficiencias críticas y recurrentes:

1. **Fragmentación y pérdida de contexto:** Los usuarios suelen escribir prompts aislados en chats vacíos, obligándose a reiterar manualmente el nombre del negocio, tono, público objetivo y restricciones en cada conversación.
2. **Alucinación de datos corporativos:** Cuando la IA no cuenta con un contexto explícito y delimitado, tiende a inventar precios, canales de contacto, horarios y características de productos o servicios.
3. **Inconsistencia de marca:** Múltiples colaboradores de una misma empresa generan textos publicitarios, publicaciones o correos con estilos, terminología y propuestas de valor dispares.
4. **Barrera técnica en la preparación de instrucciones:** Estructurar archivos Markdown de sistema efectivos, reglas de inferencia y plantillas para herramientas como Claude Projects o Custom GPTs requiere conocimientos avanzados de ingeniería de contexto que la mayoría de emprendedores y profesionales no poseen.
5. **Costos y tiempos elevados en agencias:** Las agencias de comunicación y freelancers invierten decenas de horas en la redacción manual de manuales de tono, briefs creativos y directrices para cada cliente.

---

## 4. Objetivo General

Proveer una solución de software integral y de autoservicio que transforme datos empresariales sin procesar en un ecosistema de documentación Markdown interoperable, modular y rigurosamente validado, permitiendo que cualquier organización potencie sus flujos de trabajo con modelos de inteligencia artificial sin inconsistencias ni alucinaciones.

---

## 5. Objetivos Específicos

- **Estandarizar el modelo de datos empresarial:** Diseñar esquemas estrictos (JSON Schema) que capturen identidad, oferta, audiencia y canales sin ambigüedades.
- **Automatizar la generación documental:** Implementar un motor de plantillas capaz de producir guías de negocio, manuales de identidad y generadores especializados en segundos.
- **Garantizar la veracidad de la información:** Imponer reglas de generación que impidan la fabricación de información no provista por el usuario.
- **Facilitar la adopción multiplataforma:** Producir artefactos Markdown 100% compatibles con ChatGPT (Custom GPTs y proyectos de equipo), Claude Projects, Cursor, Copilot y agentes basados en archivos locales.
- **Modularizar la creación de contenido:** Suministrar generadores específicos para flyers, textos de campañas, ideas de videos, guiones técnicos y storyboards.
- **Proteger la privacidad y seguridad:** Garantizar una arquitectura donde las credenciales de API permanezcan resguardadas en el backend y los datos del negocio pertenezcan exclusivamente al usuario.

---

## 6. Público Objetivo

- **Emprendedores y Pequeñas y Medianas Empresas (PyMEs):** Que buscan profesionalizar su comunicación y utilizar asistentes de IA con pleno conocimiento de su catálogo y valores.
- **Agencias de Marketing y Publicidad:** Que necesitan acelerar el onboarding de nuevos clientes y generar briefs, matrices de contenido y directrices de IA de forma repetible y escalable.
- **Creadores de Contenido y Copywriters:** Que requieren marcos estructurados para idear guiones de video, carruseles, publicaciones y campañas alineadas con una marca.
- **Consultores de Transformación Digital:** Que implementan soluciones de inteligencia artificial en organizaciones y requieren entregar documentación de contexto lista para producción.

---

## 7. Alcance Funcional

El sistema abarca:

1. **Captura y validación de datos:** Formularios guiados por pasos (stepper) que recopilan información comercial, canales de contacto, identidad gráfica, catálogo y metas comerciales.
2. **Selección modular:** El usuario activa únicamente los módulos requeridos (núcleo empresarial, generadores de flyers, campañas, videos, etc.).
3. **Orquestación con proveedores de IA:** Procesamiento de prompts y plantillas a través de modelos de OpenAI, Anthropic y Google con parámetros controlados.
4. **Previsualización interactiva:** Visualización del contenido Markdown en tiempo real antes de la exportación.
5. **Exportación multi-formato:** Descarga de paquetes completos en formato comprimido ZIP y exportación de archivos Markdown individuales.
6. **Integraciones futuras:** Publicación directa a repositorios de GitHub y sincronización con plataformas de gestión documental.

---

## 8. Principales Beneficios

- **Ahorro masivo de tiempo:** De días de preparación manual a minutos de generación asistida.
- **Precisión garantizada:** Directrices explícitas que eliminan respuestas genéricas y alucinadas por parte de los LLM.
- **Reutilización transversal:** Una única base de contexto documental sirve para el equipo de ventas, soporte, marketing y dirección.
- **Independencia del proveedor:** Los archivos generados son texto plano estándar (Markdown), sin ataduras a ningún software propietario.

---

## 9. Visión de Crecimiento

A mediano y largo plazo, ContextStudio IA evolucionará de un generador documental estático a un centro de operaciones de contexto empresarial:
- **Fase analítica:** Evaluación de la calidad del contexto y auditoría de coherencia de marca.
- **Conectores vivos:** Sincronización continua con bases de conocimiento dinámicas (Notion, Google Docs, CRM).
- **Ecosistema de plantillas de la comunidad:** Catálogo de generadores específicos por industria (gastronomía, salud, SaaS, retail, legal).
