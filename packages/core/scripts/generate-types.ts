import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Script reproducible para generar y sincronizar los tipos TypeScript y el esquema embebido
const rootSchemaPath = path.resolve(__dirname, '../../../esquemas/negocio.schema.json');
const typesOutputPath = path.resolve(__dirname, '../src/types/schema.ts');
const schemaTsOutputPath = path.resolve(__dirname, '../src/validation/schema.data.ts');
const schemaJsonOutputPath = path.resolve(__dirname, '../src/validation/negocio.schema.json');

if (!fs.existsSync(rootSchemaPath)) {
  console.error(`Error: Esquema no encontrado en ${rootSchemaPath}`);
  process.exit(1);
}

const schemaRaw = fs.readFileSync(rootSchemaPath, 'utf-8');
const schema = JSON.parse(schemaRaw);

// 1. Sincronizar esquema interno en JSON y TS (para máxima portabilidad en bundlers y Node)
fs.mkdirSync(path.dirname(schemaJsonOutputPath), { recursive: true });
fs.writeFileSync(schemaJsonOutputPath, JSON.stringify(schema, null, 2), 'utf-8');

const schemaTsContent = `/**
 * ESQUEMA DE DATOS EMBEBIDO EN TYPESCRIPT
 * Generado automáticamente desde esquemas/negocio.schema.json
 */
export const SCHEMA_DATA = ${JSON.stringify(schema, null, 2)} as const;
export default SCHEMA_DATA;
`;
fs.writeFileSync(schemaTsOutputPath, schemaTsContent, 'utf-8');
console.log(`Esquema sincronizado en ${schemaJsonOutputPath} y ${schemaTsOutputPath}`);

// 2. Generar tipos TypeScript estrictos
const generatedContent = `/**
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
`;

fs.mkdirSync(path.dirname(typesOutputPath), { recursive: true });
fs.writeFileSync(typesOutputPath, generatedContent, 'utf-8');
console.log(`Tipos TypeScript generados exitosamente en ${typesOutputPath}`);
