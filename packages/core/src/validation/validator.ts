import { createRequire } from 'module';
import type { ErrorObject } from 'ajv';
import type { PerfilNegocio, ResultadoValidacion, ErrorValidacion } from '../types/index.js';
import { SCHEMA_DATA } from './schema.data.js';

// Ajv y ajv-formats son módulos CJS. Bajo module:NodeNext + esModuleInterop,
// sus declaraciones .d.ts no exponen construct/call signatures directamente.
// Usamos createRequire para cargarlos sin ambigüedad de interop.
const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Ajv2020: new (opts?: Record<string, unknown>) => {
  compile<T>(schema: unknown): ((data: unknown) => boolean) & { errors: ErrorObject[] | null };
  addFormat(name: string, format: unknown): void;
} = require('ajv/dist/2020').default ?? require('ajv/dist/2020');

// eslint-disable-next-line @typescript-eslint/no-require-imports
const addFormats: (ajv: unknown, opts?: unknown) => void =
  require('ajv-formats').default ?? require('ajv-formats');

const ajv = new Ajv2020({
  allErrors: true,
  strict: false,
  verbose: true,
});

addFormats(ajv);

const validateSchema = ajv.compile<PerfilNegocio>(SCHEMA_DATA);

/**
 * Traduce y formatea los errores de Ajv a mensajes comprensibles en español.
 */
function formatearMensajeError(err: ErrorObject): string {
  const campo = err.instancePath
    ? err.instancePath.replace(/^\//, '').replace(/\//g, '.')
    : (err.params.missingProperty as string) || 'raíz';

  switch (err.keyword) {
    case 'required':
      return `El campo '${err.params.missingProperty}' es obligatorio y no fue proporcionado.`;
    case 'type':
      return `El campo '${campo}' debe ser de tipo ${err.params.type}.`;
    case 'pattern':
      if (campo.includes('slug')) {
        return `El slug '${err.data}' no es válido. Debe contener solo letras minúsculas, números y guiones (ej. 'mi-empresa-2026').`;
      }
      if (campo.includes('hex')) {
        return `El código de color '${err.data}' no es válido. Debe ser un formato hexadecimal estándar de 6 caracteres (ej. '#FF5733').`;
      }
      return `El campo '${campo}' no cumple con el patrón requerido: ${err.schema}`;
    case 'enum':
      return `El valor '${err.data}' en '${campo}' no es válido. Valores permitidos: ${(err.schema as unknown[]).join(', ')}.`;
    case 'format':
      if (err.params.format === 'email') {
        return `El correo electrónico '${err.data}' en '${campo}' no tiene un formato válido.`;
      }
      if (err.params.format === 'uri') {
        return `La URL '${err.data}' en '${campo}' no tiene un formato URI válido.`;
      }
      return `El campo '${campo}' no cumple con el formato '${err.params.format}'.`;
    case 'minLength':
      return `El campo '${campo}' debe tener al menos ${err.params.limit} caracteres.`;
    case 'maxLength':
      return `El campo '${campo}' no puede superar los ${err.params.limit} caracteres.`;
    case 'minItems':
      return `El listado '${campo}' debe contener al menos ${err.params.limit} elemento(s).`;
    case 'additionalProperties':
      return `Propiedad no permitida en '${campo}': '${err.params.additionalProperty}'.`;
    default:
      return err.message ? `Error en '${campo}': ${err.message}` : `Error de validación en '${campo}'.`;
  }
}

/**
 * Valida los datos de entrada contra el esquema oficial JSON Schema Draft 2020-12.
 *
 * @param datos Objeto con la información del negocio a validar.
 * @returns ResultadoValidacion con el estado y lista detallada de errores si los hubiera.
 */
export function validarNegocio(datos: unknown): ResultadoValidacion {
  if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
    return {
      valido: false,
      errores: [
        {
          campo: 'raíz',
          mensaje: 'Los datos del negocio deben ser un objeto JSON válido.',
          regla: 'type',
          valorRecibido: datos,
        },
      ],
    };
  }

  const valido = validateSchema(datos);

  if (valido) {
    return {
      valido: true,
      errores: [],
      datos: datos as PerfilNegocio,
    };
  }

  const errores: ErrorValidacion[] = (validateSchema.errors || []).map((err: ErrorObject) => {
    const campo = err.instancePath
      ? err.instancePath.replace(/^\//, '').replace(/\//g, '.')
      : (err.params.missingProperty as string) || 'raíz';

    return {
      campo,
      mensaje: formatearMensajeError(err),
      regla: err.keyword,
      valorRecibido: err.data,
    };
  });

  return {
    valido: false,
    errores,
  };
}
