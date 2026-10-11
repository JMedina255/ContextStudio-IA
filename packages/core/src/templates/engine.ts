import HandlebarsPkg from 'handlebars';
import { TEMPLATES_BUNDLE } from './bundle.js';

// Compatibilidad interop ESM/CJS para Handlebars
const Handlebars = (HandlebarsPkg as unknown as { default?: typeof HandlebarsPkg }).default ?? HandlebarsPkg;

// Cache de plantillas compiladas para máximo rendimiento
const compiledTemplatesCache = new Map<string, Handlebars.TemplateDelegate>();

/**
 * Obtiene o compila una plantilla del bundle en memoria.
 */
function getCompiledTemplate(templateKey: string): Handlebars.TemplateDelegate {
  const cached = compiledTemplatesCache.get(templateKey);
  if (cached) {
    return cached;
  }

  const rawTemplate = TEMPLATES_BUNDLE[templateKey];
  if (!rawTemplate) {
    throw new Error(`Error del motor de plantillas: Plantilla no encontrada para la clave '${templateKey}'.`);
  }

  // noEscape: true para respetar caracteres Markdown (<br>, |, &, etc.)
  const compiled = Handlebars.compile(rawTemplate, {
    noEscape: true,
    strict: false,
    preventIndent: true,
  });

  compiledTemplatesCache.set(templateKey, compiled);
  return compiled;
}

/**
 * Comprueba si en el texto renderizado han quedado etiquetas sin resolver de tipo {{variable}}.
 */
export function detectarVariablesNoResueltas(contenido: string): string[] {
  // Buscar ocurrencias de {{...}} que no correspondan a bloques de código de ejemplo
  const matches = contenido.match(/\{\{([a-zA-Z0-9_]+)\}\}/g);
  if (!matches) {
    return [];
  }
  return Array.from(new Set(matches));
}

/**
 * Renderiza una plantilla utilizando el bundle interno en memoria.
 *
 * @param templateKey Clave de la plantilla (ej. 'nucleo/00_NEGOCIO.md')
 * @param contexto Datos normalizados a inyectar en la plantilla
 * @returns Contenido Markdown renderizado
 */
export function renderizarPlantilla(
  templateKey: string,
  contexto: Record<string, unknown>
): string {
  const template = getCompiledTemplate(templateKey);
  const resultado = template(contexto);

  const variablesSinResolver = detectarVariablesNoResueltas(resultado);
  if (variablesSinResolver.length > 0) {
    throw new Error(
      `Error al renderizar '${templateKey}': Se detectaron variables no resueltas: ${variablesSinResolver.join(', ')}`
    );
  }

  return resultado.trimEnd() + '\n';
}

/**
 * Permite limpiar el cache de plantillas si fuera necesario en pruebas.
 */
export function limpiarCachePlantillas(): void {
  compiledTemplatesCache.clear();
}
