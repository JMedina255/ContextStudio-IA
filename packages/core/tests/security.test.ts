import { describe, it, expect } from 'vitest';
import { isPathSafe, normalizeSafePath } from '../src/utils/paths.js';
import { generarProyecto } from '../src/generators/project.js';
import type { PerfilNegocio } from '../src/types/index.js';
import demoData from '../../../ejemplos/negocio.demo.json' with { type: 'json' };

describe('Módulo de Seguridad e Inyecciones', () => {
  it('debe bloquear intentos de path traversal con ../ o rutas absolutas', () => {
    expect(isPathSafe('../archivo.md')).toBe(false);
    expect(isPathSafe('../../etc/passwd')).toBe(false);
    expect(isPathSafe('/absoluta/ruta.md')).toBe(false);
    expect(isPathSafe('C:/Windows/archivo.md')).toBe(false);
    expect(isPathSafe('carpeta/../escape.md')).toBe(false);
    expect(isPathSafe('archivo<invalido>.md')).toBe(false);
    expect(isPathSafe('archivo:nombre.md')).toBe(false);
    expect(isPathSafe('')).toBe(false);
  });

  it('debe aceptar rutas relativas limpias y seguras', () => {
    expect(isPathSafe('README.md')).toBe(true);
    expect(isPathSafe('nucleo/00_NEGOCIO.md')).toBe(true);
    expect(isPathSafe('generadores/FLYERS.md')).toBe(true);
    expect(normalizeSafePath('nucleo//00_NEGOCIO.md')).toBe('nucleo/00_NEGOCIO.md');
  });

  it('debe lanzar error cuando normalizeSafePath recibe una ruta insegura', () => {
    expect(() => normalizeSafePath('../escape.md')).toThrow(/Ruta insegura/);
  });

  it('debe neutralizar intentos de inyección de código y scripts en campos de texto', () => {
    const payloadInyeccion: PerfilNegocio = {
      ...(demoData as PerfilNegocio),
      descripcion: '<script>alert("xss")</script> Intento de inyección de código.',
      mision: '{{process.exit(1)}} Intento de inyección en plantilla.',
    };

    // La generación debe completarse sin ejecutar código malicioso
    const proyecto = generarProyecto(payloadInyeccion);
    expect(proyecto.totalArchivos).toBe(13);

    const readme = proyecto.archivos.find((a) => a.ruta === 'nucleo/00_NEGOCIO.md');
    expect(readme?.contenido).toContain('<script>alert("xss")</script>');
    expect(readme?.contenido).toContain('{{process.exit(1)}}');
  });
});
