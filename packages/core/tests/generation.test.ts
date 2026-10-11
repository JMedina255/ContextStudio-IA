import { describe, it, expect } from 'vitest';
import { generarProyecto } from '../src/generators/project.js';
import type { PerfilNegocio } from '../src/types/index.js';
import demoData from '../../../ejemplos/negocio.demo.json' with { type: 'json' };

describe('Módulo de Generación Principal: generarProyecto', () => {
  it('debe generar los 13 archivos cuando todos los módulos están activos', () => {
    const proyecto = generarProyecto(demoData, {
      fecha: '2026-10-11',
      version: '1.0.0',
    });

    expect(proyecto.nombre).toBe(demoData.nombre_comercial);
    expect(proyecto.slug).toBe(demoData.slug);
    expect(proyecto.totalArchivos).toBe(13);
    expect(proyecto.archivos).toHaveLength(13);

    const rutas = proyecto.archivos.map((a) => a.ruta);
    // Base obligatorios
    expect(rutas).toContain('README.md');
    expect(rutas).toContain('INSTRUCCIONES_CHATGPT.md');
    expect(rutas).toContain('nucleo/00_NEGOCIO.md');
    expect(rutas).toContain('nucleo/01_IDENTIDAD_VISUAL.md');
    expect(rutas).toContain('nucleo/02_PRODUCTOS_SERVICIOS.md');
    expect(rutas).toContain('nucleo/03_REGLAS_GENERALES.md');
    expect(rutas).toContain('recursos/README.md');
    // MOD-03
    expect(rutas).toContain('generadores/FLYERS.md');
    // MOD-04
    expect(rutas).toContain('generadores/PUBLICACIONES.md');
    expect(rutas).toContain('generadores/CAMPAÑAS.md');
    // MOD-05
    expect(rutas).toContain('generadores/IDEAS_VIDEO.md');
    expect(rutas).toContain('generadores/GUIONES_VIDEO.md');
    expect(rutas).toContain('generadores/STORYBOARD.md');
  });

  it('debe generar exactamente los 7 archivos base cuando solo MOD-01 y MOD-02 están seleccionados', () => {
    const soloBase: PerfilNegocio = {
      ...(demoData as PerfilNegocio),
      modulos_seleccionados: ['MOD-01', 'MOD-02'],
    };

    const proyecto = generarProyecto(soloBase, {
      fecha: '2026-10-11',
      version: '1.0.0',
    });

    expect(proyecto.totalArchivos).toBe(7);
    const rutas = proyecto.archivos.map((a) => a.ruta);
    expect(rutas.some((r) => r.startsWith('generadores/'))).toBe(false);
  });

  it('debe generar 8 archivos cuando se activa MOD-03 (Flyers)', () => {
    const conFlyers: PerfilNegocio = {
      ...(demoData as PerfilNegocio),
      modulos_seleccionados: ['MOD-01', 'MOD-02', 'MOD-03'],
    };

    const proyecto = generarProyecto(conFlyers);
    expect(proyecto.totalArchivos).toBe(8);
    const rutas = proyecto.archivos.map((a) => a.ruta);
    expect(rutas).toContain('generadores/FLYERS.md');
    expect(rutas).not.toContain('generadores/PUBLICACIONES.md');
    expect(rutas).not.toContain('generadores/IDEAS_VIDEO.md');
  });

  it('debe generar 9 archivos cuando se activa MOD-04 (Campañas y Publicaciones)', () => {
    const conCampanas: PerfilNegocio = {
      ...(demoData as PerfilNegocio),
      modulos_seleccionados: ['MOD-01', 'MOD-02', 'MOD-04'],
    };

    const proyecto = generarProyecto(conCampanas);
    expect(proyecto.totalArchivos).toBe(9);
    const rutas = proyecto.archivos.map((a) => a.ruta);
    expect(rutas).toContain('generadores/PUBLICACIONES.md');
    expect(rutas).toContain('generadores/CAMPAÑAS.md');
    expect(rutas).not.toContain('generadores/FLYERS.md');
  });

  it('debe generar 10 archivos cuando se activa MOD-05 (Audiovisual: Ideas, Guiones, Storyboard)', () => {
    const conVideos: PerfilNegocio = {
      ...(demoData as PerfilNegocio),
      modulos_seleccionados: ['MOD-01', 'MOD-02', 'MOD-05'],
    };

    const proyecto = generarProyecto(conVideos);
    expect(proyecto.totalArchivos).toBe(10);
    const rutas = proyecto.archivos.map((a) => a.ruta);
    expect(rutas).toContain('generadores/IDEAS_VIDEO.md');
    expect(rutas).toContain('generadores/GUIONES_VIDEO.md');
    expect(rutas).toContain('generadores/STORYBOARD.md');
    expect(rutas).not.toContain('generadores/FLYERS.md');
  });

  it('debe garantizar determinismo: entradas y opciones idénticas generan resultados idénticos', () => {
    const proyecto1 = generarProyecto(demoData, {
      fecha: '2026-10-11',
      version: '1.0.0',
    });
    const proyecto2 = generarProyecto(demoData, {
      fecha: '2026-10-11',
      version: '1.0.0',
    });

    expect(proyecto1.totalArchivos).toBe(proyecto2.totalArchivos);
    for (let i = 0; i < proyecto1.archivos.length; i++) {
      expect(proyecto1.archivos[i].ruta).toBe(proyecto2.archivos[i].ruta);
      expect(proyecto1.archivos[i].contenido).toBe(proyecto2.archivos[i].contenido);
    }
  });

  it('no debe dejar variables {{...}} sin resolver en ningún archivo generado', () => {
    const proyecto = generarProyecto(demoData);
    for (const archivo of proyecto.archivos) {
      // Buscar etiquetas sin resolver {{variable}}
      const match = archivo.contenido.match(/\{\{([a-zA-Z0-9_]+)\}\}/);
      expect(match).toBeNull();
    }
  });

  it('debe lanzar error si se envían datos inválidos que no cumplan el esquema', () => {
    const datosInvalidos = { ...demoData, slug: 'INVALID_SLUG_CON_MAYUSCULAS' };
    expect(() => {
      generarProyecto(datosInvalidos);
    }).toThrow(/Fallo de validación/);
  });
});
