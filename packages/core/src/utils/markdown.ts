import type { PrecioItem } from '../types/index.js';

/**
 * Escapa caracteres que pueden romper una celda en una tabla Markdown (barras verticales y saltos de línea).
 */
export function escapeMarkdownTableCell(text: string | null | undefined): string {
  if (text == null) return '';
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, '<br>')
    .trim();
}

/**
 * Formatea un objeto PrecioItem a una representación textual clara sin inventar monedas ni montos.
 */
export function formatPrecio(precio?: PrecioItem | null): string {
  if (!precio) {
    return '[No especificado]';
  }

  const { monto, moneda, detalles } = precio;

  if (monto != null) {
    const formattedMonto = monto.toLocaleString('es-ES');
    const currencyStr = moneda ? ` ${moneda}` : '';
    const detailsStr = detalles ? ` (${detalles})` : '';
    return `${formattedMonto}${currencyStr}${detailsStr}`.trim();
  }

  if (detalles) {
    return detalles;
  }

  return '[No especificado]';
}

/**
 * Formatea un arreglo de cadenas en una lista con viñetas Markdown.
 */
export function formatBulletList(items?: string[] | null, fallback = '[No especificado]'): string {
  if (!items || items.length === 0) {
    return fallback;
  }
  return items.map((item) => `- ${item.trim()}`).join('\n');
}
