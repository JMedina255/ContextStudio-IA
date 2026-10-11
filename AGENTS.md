# Directrices para Agentes de Inteligencia Artificial — ContextStudio IA

Este documento define las reglas de conducta, directrices operativas y principios arquitectónicos de obligatorio cumplimiento para cualquier agente de IA (incluyendo modelos de lenguaje, asistentes de código y sistemas automatizados) que interactúe, modifique o extienda el repositorio de **ContextStudio IA**.

---

## 1. Principios Fundamentales

1. **Lectura previa obligatoria:**
   - Antes de implementar cualquier cambio, modificación de código o creación de archivos, el agente debe leer y comprender el archivo [README.md](README.md) y todos los documentos alojados en el directorio [nucleo/](nucleo/) ([00_PROPOSITO.md](nucleo/00_PROPOSITO.md), [01_ARQUITECTURA.md](nucleo/01_ARQUITECTURA.md), [02_REGLAS_GENERALES.md](nucleo/02_REGLAS_GENERALES.md), [03_ESTRUCTURA_SALIDA.md](nucleo/03_ESTRUCTURA_SALIDA.md) y [04_MODULOS.md](nucleo/04_MODULOS.md)).

2. **Cero alucinación de datos empresariales:**
   - Queda estrictamente prohibido inventar o asumir información de negocios (teléfonos, direcciones, correos electrónicos, precios, características de productos o datos legales).
   - Si un dato no está especificado por el usuario o en el esquema de entrada, debe representarse explícitamente como no proporcionado (por ejemplo: `[No especificado]`, `[Pendiente de definir]`) o mantenerse como campo opcional nulo.

3. **Consistencia de nomenclatura y rutas:**
   - Respetar de forma rigurosa la convención de nombres de archivos, directorios y rutas relativas.
   - En plantillas, utilizar invariablemente la convención de llaves dobles en minúsculas y snake_case: `{{nombre_variable}}`.

4. **Separación estricta de responsabilidades:**
   - Diferenciar con total claridad:
     - **La plataforma generadora:** aplicación web React + Vite + TypeScript, backend proxy y motor de generación.
     - **Los proyectos de contexto empresarial generados:** paquetes de archivos Markdown resultantes para un negocio particular.
     - **Las plantillas núcleo:** modelos abstractos reutilizables en `plantillas/`.
   - No confundir la generación de instrucciones/prompts con la generación o renderizado directo de activos multimedia (imágenes o videos).

5. **Seguridad y confidencialidad:**
   - Nunca introducir claves de API, tokens secretos, contraseñas o datos sensibles en ningún archivo del repositorio ni en el historial de Git.
   - Verificar siempre que `.gitignore` excluya `.env`, `.env.*` y artefactos de desarrollo local.

6. **Actualización continua de la documentación:**
   - Todo cambio arquitectónico o funcional debe reflejarse en [docs/DECISIONES.md](docs/DECISIONES.md) y [docs/ROADMAP.md](docs/ROADMAP.md).
   - No anunciar funcionalidades futuras o en borrador como si ya estuvieran completamente implementadas.

7. **Verificación y validación antes de commits:**
   - Antes de registrar un commit, verificar:
     - Sintaxis y validez de esquemas JSON y archivos demo.
     - Coherencia de enlaces relativos en archivos Markdown.
     - Ausencia de archivos temporales o directorios residuales.
   - Seguir la convención de Conventional Commits (por ejemplo: `docs:`, `feat:`, `fix:`, `refactor:`).

---

## 2. Resumen de Convenciones Técnicas

| Elemento | Convención | Ejemplo |
| :--- | :--- | :--- |
| Variables de plantilla | Doble llave, snake_case | `{{nombre_negocio}}`, `{{publico_objetivo}}` |
| Códigos de módulos | MOD-XX | `MOD-01`, `MOD-02`, `MOD-03` |
| Esquemas JSON | JSON Schema Draft 2020-12 | `esquemas/negocio.schema.json` |
| Archivos núcleo | Prefijo numérico en mayúsculas | `00_PROPOSITO.md`, `01_ARQUITECTURA.md` |
| Formato de documentación | GitHub Flavored Markdown (GFM) | Tablas, bloques de código, listas, enlaces relativos |
