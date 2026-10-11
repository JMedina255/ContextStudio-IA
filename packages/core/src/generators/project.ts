import type {
  PerfilNegocio,
  ProyectoGenerado,
  ArchivoGenerado,
  OpcionesGeneracion,
} from '../types/index.js';
import { validarNegocio } from '../validation/validator.js';
import { normalizarNegocio } from '../normalization/normalizer.js';
import { obtenerArchivosParaModulos } from '../templates/registry.js';
import { renderizarPlantilla } from '../templates/engine.js';
import { normalizeSafePath, isPathSafe } from '../utils/paths.js';

/**
 * Genera en memoria la estructura completa de archivos Markdown para un proyecto de contexto empresarial.
 *
 * @param negocio Objeto con los datos del negocio (valida automáticamente contra el esquema oficial).
 * @param opciones Opciones de configuración (fecha fija para pruebas deterministas, versión, etc.).
 * @returns ProyectoGenerado con la lista de archivos, contenidos y metadatos.
 * @throws Error si los datos no son válidos o si ocurre un fallo en el renderizado.
 */
export function generarProyecto(
  negocio: unknown,
  opciones?: OpcionesGeneracion
): ProyectoGenerado {
  // 1. Validación formal contra el esquema
  const validacion = validarNegocio(negocio);
  if (!validacion.valido || !validacion.datos) {
    const detalleErrores = validacion.errores
      .map((e) => `  - [${e.campo}]: ${e.mensaje}`)
      .join('\n');
    throw new Error(
      `Fallo de validación en los datos del negocio. No se puede generar el proyecto:\n${detalleErrores}`
    );
  }

  const perfil = validacion.datos;

  // 2. Normalización de variables
  const vars = normalizarNegocio(perfil, opciones);

  // Banderas condicionales para las plantillas que las requieren
  const modulosSet = new Set(perfil.modulos_seleccionados);
  const hasFlyers = modulosSet.has('MOD-03');
  const hasCampanas = modulosSet.has('MOD-04');
  const hasVideos = modulosSet.has('MOD-05');
  const hasGeneradores = hasFlyers || hasCampanas || hasVideos;

  const contextoCompleto: Record<string, unknown> = {
    ...vars,
    has_flyers: hasFlyers,
    has_campanas: hasCampanas,
    has_videos: hasVideos,
    has_generadores: hasGeneradores,
  };

  // 3. Selección de archivos a generar según el registro central
  const definiciones = obtenerArchivosParaModulos(perfil.modulos_seleccionados);

  // 4. Generación de cada archivo en memoria
  const archivos: ArchivoGenerado[] = [];
  const rutasGeneradas = new Set<string>();

  for (const def of definiciones) {
    // Validar y normalizar la ruta relativa
    if (!isPathSafe(def.rutaRelativa)) {
      throw new Error(`Ruta insegura detectada en el registro de plantillas: '${def.rutaRelativa}'`);
    }
    const rutaSegura = normalizeSafePath(def.rutaRelativa);

    if (rutasGeneradas.has(rutaSegura)) {
      throw new Error(`Ruta duplicada detectada durante la generación: '${rutaSegura}'`);
    }
    rutasGeneradas.add(rutaSegura);

    // Renderizar contenido
    const contenido = renderizarPlantilla(def.templateKey, contextoCompleto);

    archivos.push({
      ruta: rutaSegura,
      contenido,
      modulo: def.moduloRequerido,
      descripcion: def.descripcion,
    });
  }

  return {
    nombre: perfil.nombre_comercial,
    slug: perfil.slug,
    archivos,
    modulos: perfil.modulos_seleccionados,
    fechaGeneracion: vars.fecha_generacion,
    versionGenerador: vars.version_generador,
    totalArchivos: archivos.length,
  };
}
