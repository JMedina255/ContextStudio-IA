import type { PerfilNegocio } from './schema.js';

export interface ErrorValidacion {
  campo: string;
  mensaje: string;
  regla?: string;
  valorRecibido?: unknown;
}

export interface ResultadoValidacion {
  valido: boolean;
  errores: ErrorValidacion[];
  datos?: PerfilNegocio;
}
