import { describe, it, expect } from 'vitest';
import { normalizarNegocio } from '../src/normalization/normalizer.js';
import { escapeMarkdownTableCell, formatPrecio, formatBulletList } from '../src/utils/markdown.js';
import type { PerfilNegocio } from '../src/types/index.js';
import demoData from '../../../ejemplos/negocio.demo.json' with { type: 'json' };

describe('Módulo de Normalización y Utilidades Markdown', () => {
  it('debe escapar correctamente caracteres especiales en celdas de tablas Markdown', () => {
    expect(escapeMarkdownTableCell('Café | Té')).toBe('Café \\| Té');
    expect(escapeMarkdownTableCell('Línea 1\nLínea 2')).toBe('Línea 1<br>Línea 2');
    expect(escapeMarkdownTableCell('Línea 1\r\nLínea 2')).toBe('Línea 1<br>Línea 2');
    expect(escapeMarkdownTableCell(null)).toBe('');
  });

  it('debe formatear precios con monto, moneda y detalles sin inventar datos', () => {
    expect(formatPrecio({ monto: 35000, moneda: 'COP', detalles: 'Bolsa' })).toContain('35');
    expect(formatPrecio({ monto: null, moneda: null, detalles: 'Cotización personalizada' })).toBe(
      'Cotización personalizada'
    );
    expect(formatPrecio(null)).toBe('[No especificado]');
    expect(formatPrecio(undefined)).toBe('[No especificado]');
  });

  it('debe formatear viñetas con fallback configurable', () => {
    expect(formatBulletList(['A', 'B'])).toBe('- A\n- B');
    expect(formatBulletList([], 'Fallback')).toBe('Fallback');
    expect(formatBulletList(null, 'Fallback')).toBe('Fallback');
  });

  it('debe normalizar negocios 100% digitales adecuando la dirección', () => {
    const digital: PerfilNegocio = {
      ...(demoData as PerfilNegocio),
      ubicacion: {
        es_digital: true,
        direccion: null,
        ciudad: null,
        pais: 'Remoto Global',
      },
    };
    const vars = normalizarNegocio(digital);
    expect(vars.es_digital).toBe(true);
    expect(vars.direccion).toContain('100% digital');
    expect(vars.ciudad_pais).toBe('Remoto Global');
  });

  it('debe manejar productos y servicios sin precio mostrando [No especificado]', () => {
    const sinPrecios: PerfilNegocio = {
      ...(demoData as PerfilNegocio),
      productos: [
        {
          id: 'p-1',
          nombre: 'Producto Libre',
          descripcion: 'Desc',
          precio: null,
        },
      ],
      servicios: [
        {
          id: 's-1',
          nombre: 'Servicio Libre',
          descripcion: 'Desc',
          precio: null,
        },
      ],
    };
    const vars = normalizarNegocio(sinPrecios);
    expect(vars.tabla_productos).toContain('[No especificado]');
    expect(vars.tabla_servicios).toContain('[No especificado]');
  });

  it('debe manejar negocios sin productos ni servicios sin fallar', () => {
    const vacio: PerfilNegocio = {
      ...(demoData as PerfilNegocio),
      productos: [],
      servicios: [],
    };
    const vars = normalizarNegocio(vacio);
    expect(vars.has_productos).toBe(false);
    expect(vars.has_servicios).toBe(false);
    expect(vars.tabla_productos_servicios).toContain('No se registraron productos ni servicios');
  });

  it('debe manejar contactos parciales y construir bloques informativos coherentes', () => {
    const parcialContactos: PerfilNegocio = {
      ...(demoData as PerfilNegocio),
      contactos: {
        telefono: null,
        whatsapp: '+57 311 000 0000',
        email: null,
        sitio_web: null,
      },
      redes_sociales: undefined,
    };
    const vars = normalizarNegocio(parcialContactos);
    expect(vars.whatsapp).toBe('+57 311 000 0000');
    expect(vars.email).toBe('[No especificado]');
    expect(vars.contactos_resumidos).toBe('WhatsApp: +57 311 000 0000');
    expect(vars.has_redes_sociales).toBe(false);
  });

  it('debe registrar todas las redes sociales cuando estén presentes', () => {
    const conTodasRedes: PerfilNegocio = {
      ...(demoData as PerfilNegocio),
      redes_sociales: {
        instagram: 'https://instagram.com/demo',
        facebook: 'https://facebook.com/demo',
        linkedin: 'https://linkedin.com/in/demo',
        tiktok: 'https://tiktok.com/@demo',
        youtube: 'https://youtube.com/@demo',
      },
    };
    const vars = normalizarNegocio(conTodasRedes);
    expect(vars.has_redes_sociales).toBe(true);
    expect(vars.redes_sociales_bloque).toContain('Facebook');
    expect(vars.redes_sociales_bloque).toContain('LinkedIn');
    expect(vars.redes_sociales_bloque).toContain('YouTube');
  });

  it('debe manejar negocios sin paleta de colores explícita', () => {
    const sinColores: PerfilNegocio = {
      ...(demoData as PerfilNegocio),
      identidad_visual: {
        ...demoData.identidad_visual,
        paleta_colores: [],
      },
    };
    const vars = normalizarNegocio(sinColores);
    expect(vars.paleta_resumida).toBe('[No especificada por el usuario]');
    expect(vars.paleta_colores).toContain('No se especificaron códigos cromáticos oficiales');
  });
});
