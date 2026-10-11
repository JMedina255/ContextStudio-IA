import type { ModuloId } from './schema.js';

export interface ArchivoGenerado {
  ruta: string;
  contenido: string;
  modulo?: ModuloId;
  descripcion?: string;
}

export interface ProyectoGenerado {
  nombre: string;
  slug: string;
  archivos: ArchivoGenerado[];
  modulos: ModuloId[];
  fechaGeneracion: string;
  versionGenerador: string;
  totalArchivos: number;
}

export interface OpcionesGeneracion {
  fecha?: string;
  version?: string;
  validarPreviamente?: boolean;
}
