/**
 * TIPOS GENERADOS AUTOMÁTICAMENTE A PARTIR DE esquemas/negocio.schema.json
 * NO MODIFICAR MANUALMENTE ESTE ARCHIVO.
 * Ejecutar 'npm run generate:types' para sincronizar con el esquema JSON.
 */

export type ModuloId =
  | 'MOD-01'
  | 'MOD-02'
  | 'MOD-03'
  | 'MOD-04'
  | 'MOD-05'
  | 'MOD-06'
  | 'MOD-07';

export interface UbicacionNegocio {
  es_digital?: boolean;
  direccion?: string | null;
  ciudad?: string | null;
  pais?: string | null;
}

export interface ContactosNegocio {
  telefono?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  sitio_web?: string | null;
}

export interface RedesSocialesNegocio {
  instagram?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  tiktok?: string | null;
  youtube?: string | null;
}

export interface PrecioItem {
  monto?: number | null;
  moneda?: string | null;
  detalles?: string | null;
}

export interface ProductoItem {
  id: string;
  nombre: string;
  descripcion: string;
  beneficios?: string[];
  precio?: PrecioItem | null;
}

export type ModalidadServicio = 'presencial' | 'remoto' | 'hibrido' | 'no_especificado';

export interface ServicioItem {
  id: string;
  nombre: string;
  descripcion: string;
  beneficios?: string[];
  modalidad?: ModalidadServicio;
  precio?: PrecioItem | null;
}

export interface PublicoObjetivoNegocio {
  perfil_demografico?: string | null;
  perfil_psicografico?: string | null;
  puntos_dolor?: string[];
  motivadores_compra?: string[];
  objeciones_comunes?: string[];
}

export interface ColorItem {
  nombre: string;
  hex: string;
  uso: string;
}

export interface TipografiasNegocio {
  principal?: string | null;
  secundaria?: string | null;
}

export interface IdentidadVisualNegocio {
  tono_voz?: string;
  personalidad_marca?: string[];
  paleta_colores?: ColorItem[];
  tipografias?: TipografiasNegocio;
  restricciones_esteticas?: string[];
}

export interface ObjetivosComercialesNegocio {
  metas_principales?: string[];
  llamadas_a_la_accion_principales?: string[];
}

/**
 * Contrato de entrada principal para un negocio en ContextStudio IA.
 */
export interface PerfilNegocio {
  slug: string;
  nombre_comercial: string;
  rubro: string;
  descripcion: string;
  mision?: string | null;
  vision?: string | null;
  ubicacion?: UbicacionNegocio;
  contactos: ContactosNegocio;
  redes_sociales?: RedesSocialesNegocio;
  productos?: ProductoItem[];
  servicios?: ServicioItem[];
  publico_objetivo?: PublicoObjetivoNegocio;
  identidad_visual?: IdentidadVisualNegocio;
  objetivos_comerciales?: ObjetivosComercialesNegocio;
  modulos_seleccionados: ModuloId[];
}
