import type { ModuloId } from '../types/index.js';

export interface DefinicionArchivoSalida {
  rutaRelativa: string;
  templateKey: string;
  moduloRequerido?: ModuloId;
  descripcion: string;
}

/**
 * Registro central único que relaciona los módulos seleccionados con los archivos de salida
 * y sus plantillas correspondientes, según la especificación de nucleo/03_ESTRUCTURA_SALIDA.md.
 */
export const REGISTRO_ARCHIVOS_SALIDA: readonly DefinicionArchivoSalida[] = [
  // 1. Archivos base obligatorios (MOD-01 y MOD-02)
  {
    rutaRelativa: 'README.md',
    templateKey: 'base/README.md',
    descripcion: 'Índice maestro de navegación y guía de uso del contexto empresarial',
  },
  {
    rutaRelativa: 'INSTRUCCIONES_CHATGPT.md',
    templateKey: 'base/INSTRUCCIONES_CHATGPT.md',
    descripcion: 'Instrucciones maestras de sistema para Custom GPTs y Claude Projects',
  },
  {
    rutaRelativa: 'nucleo/00_NEGOCIO.md',
    templateKey: 'nucleo/00_NEGOCIO.md',
    descripcion: 'Perfil institucional, contactos verificados y modelo comercial',
  },
  {
    rutaRelativa: 'nucleo/01_IDENTIDAD_VISUAL.md',
    templateKey: 'nucleo/01_IDENTIDAD_VISUAL.md',
    descripcion: 'Paleta cromática oficial, tipografías y tono de voz de marca',
  },
  {
    rutaRelativa: 'nucleo/02_PRODUCTOS_SERVICIOS.md',
    templateKey: 'nucleo/02_PRODUCTOS_SERVICIOS.md',
    descripcion: 'Catálogo oficial de productos y servicios con precios verificados',
  },
  {
    rutaRelativa: 'nucleo/03_REGLAS_GENERALES.md',
    templateKey: 'nucleo/03_REGLAS_GENERALES.md',
    descripcion: 'Políticas de cero alucinación y directrices éticas de la empresa',
  },
  {
    rutaRelativa: 'recursos/README.md',
    templateKey: 'base/recursos_README.md',
    descripcion: 'Guía de activos complementarios, logotipos y manuales de marca',
  },

  // 2. Módulo MOD-03: Generación de instrucciones para imágenes publicitarias
  {
    rutaRelativa: 'generadores/FLYERS.md',
    templateKey: 'generadores/FLYERS.md',
    moduloRequerido: 'MOD-03',
    descripcion: 'Briefs técnicos y prompts de diseño para flyers y banners publicitarios',
  },

  // 3. Módulo MOD-04: Generación de campañas y textos publicitarios
  {
    rutaRelativa: 'generadores/PUBLICACIONES.md',
    templateKey: 'generadores/PUBLICACIONES.md',
    moduloRequerido: 'MOD-04',
    descripcion: 'Estructura de copys y publicaciones orgánicas para redes sociales',
  },
  {
    rutaRelativa: 'generadores/CAMPAÑAS.md',
    templateKey: 'generadores/CAMPAÑAS.md',
    moduloRequerido: 'MOD-04',
    descripcion: 'Estructuración de campañas publicitarias multicanal y marcos AIDA/PAS',
  },

  // 4. Módulo MOD-05: Generación de ideas y guiones de videos
  {
    rutaRelativa: 'generadores/IDEAS_VIDEO.md',
    templateKey: 'generadores/IDEAS_VIDEO.md',
    moduloRequerido: 'MOD-05',
    descripcion: 'Conceptos y ángulos narrativos audiovisuales para video corto',
  },
  {
    rutaRelativa: 'generadores/GUIONES_VIDEO.md',
    templateKey: 'generadores/GUIONES_VIDEO.md',
    moduloRequerido: 'MOD-05',
    descripcion: 'Guiones técnicos audiovisuales escena por escena',
  },
  {
    rutaRelativa: 'generadores/STORYBOARD.md',
    templateKey: 'generadores/STORYBOARD.md',
    moduloRequerido: 'MOD-05',
    descripcion: 'Desglose cinematográfico de planos y prompts de video para IA',
  },
];

/**
 * Filtra y devuelve la lista de archivos a generar según los módulos activos del negocio.
 */
export function obtenerArchivosParaModulos(
  modulosActivos: readonly ModuloId[]
): DefinicionArchivoSalida[] {
  const modulosSet = new Set(modulosActivos);
  return REGISTRO_ARCHIVOS_SALIDA.filter((def) => {
    // Si no requiere módulo específico, es un archivo base obligatorio
    if (!def.moduloRequerido) {
      return true;
    }
    return modulosSet.has(def.moduloRequerido);
  });
}
