import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Script para empaquetar plantillas ejecutables (.hbs) en un bundle TypeScript sin dependencia de 'fs' en tiempo de ejecución
const templatesDir = path.resolve(__dirname, '../templates');
const bundleOutputPath = path.resolve(__dirname, '../src/templates/bundle.ts');

if (!fs.existsSync(templatesDir)) {
  console.error(`Error: Directorio de plantillas no encontrado en ${templatesDir}`);
  process.exit(1);
}

function getTemplateFiles(dir: string, base = ''): { key: string; content: string }[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results: { key: string; content: string }[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relKey = base ? `${base}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      results.push(...getTemplateFiles(fullPath, relKey));
    } else if (entry.name.endsWith('.hbs')) {
      const templateKey = relKey.replace(/\.hbs$/, '');
      const content = fs.readFileSync(fullPath, 'utf-8');
      results.push({ key: templateKey, content });
    }
  }

  return results;
}

const templates = getTemplateFiles(templatesDir);
console.log(`Empaquetando ${templates.length} plantillas...`);

const templatesRecord: Record<string, string> = {};
for (const t of templates) {
  templatesRecord[t.key] = t.content;
}

const fileHeader = `/**
 * BUNDLE DE PLANTILLAS GENERADO AUTOMÁTICAMENTE
 * NO MODIFICAR MANUALMENTE ESTE ARCHIVO.
 * Ejecutar 'npm run generate:templates' para sincronizar con los archivos en packages/core/templates/.
 */

export const TEMPLATES_BUNDLE: Readonly<Record<string, string>> = ${JSON.stringify(templatesRecord, null, 2)};
`;

fs.mkdirSync(path.dirname(bundleOutputPath), { recursive: true });
fs.writeFileSync(bundleOutputPath, fileHeader, 'utf-8');
console.log(`Bundle de plantillas generado exitosamente en ${bundleOutputPath}`);
