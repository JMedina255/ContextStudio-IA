import { describe, it, expect, beforeEach } from 'vitest';
import {
  renderizarPlantilla,
  detectarVariablesNoResueltas,
  limpiarCachePlantillas,
} from '../src/templates/engine.js';
import { TEMPLATES_BUNDLE } from '../src/templates/bundle.js';

describe('Módulo del Motor de Plantillas', () => {
  beforeEach(() => {
    limpiarCachePlantillas();
  });

  it('debe contener todas las 13 plantillas requeridas en el bundle', () => {
    const keys = Object.keys(TEMPLATES_BUNDLE);
    expect(keys).toHaveLength(13);
    expect(keys).toContain('base/README.md');
    expect(keys).toContain('base/INSTRUCCIONES_CHATGPT.md');
    expect(keys).toContain('nucleo/00_NEGOCIO.md');
    expect(keys).toContain('nucleo/01_IDENTIDAD_VISUAL.md');
    expect(keys).toContain('nucleo/02_PRODUCTOS_SERVICIOS.md');
    expect(keys).toContain('nucleo/03_REGLAS_GENERALES.md');
    expect(TEMPLATES_BUNDLE['base/recursos_README.md']).toBeDefined();
    expect(keys).toContain('generadores/FLYERS.md');
    expect(keys).toContain('generadores/PUBLICACIONES.md');
    expect(keys).toContain('generadores/CAMPAÑAS.md');
    expect(keys).toContain('generadores/IDEAS_VIDEO.md');
    expect(keys).toContain('generadores/GUIONES_VIDEO.md');
    expect(keys).toContain('generadores/STORYBOARD.md');
  });

  it('debe renderizar correctamente una plantilla con variables y sin residuos', () => {
    const resultado = renderizarPlantilla('base/recursos_README.md', {
      nombre_negocio: 'Empresa Test',
    });
    expect(resultado).toContain('Empresa Test');
    expect(resultado).not.toContain('{{nombre_negocio}}');
  });

  it('debe lanzar error cuando se solicita una clave de plantilla inexistente', () => {
    expect(() => {
      renderizarPlantilla('inexistente/archivo.md', {});
    }).toThrow(/Plantilla no encontrada/);
  });

  it('debe detectar variables no resueltas en una cadena de texto', () => {
    const textoConMarcadores = 'Hola {{nombre_negocio}} y {{telefono}}';
    const noResueltas = detectarVariablesNoResueltas(textoConMarcadores);
    expect(noResueltas).toEqual(['{{nombre_negocio}}', '{{telefono}}']);
  });

  it('debe retornar arreglo vacío cuando no hay variables sin resolver', () => {
    const textoLimpio = 'Texto limpio sin llaves dobles ni marcadores';
    expect(detectarVariablesNoResueltas(textoLimpio)).toHaveLength(0);
  });
});
