import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validarNegocio, generarProyecto } from '@contextstudio/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('\n=============================================================');
  console.log('   CONTEXTSTUDIO IA — EJECUCIÓN DEMOSTRATIVA (FASE 02)        ');
  console.log('=============================================================\n');

  const demoFilePath = path.resolve(__dirname, '../ejemplos/negocio.demo.json');
  console.log(`[1/4] Leyendo archivo de demostración: ${demoFilePath}`);

  if (!fs.existsSync(demoFilePath)) {
    console.error(`Error: Archivo no encontrado en ${demoFilePath}`);
    process.exit(1);
  }

  const rawJson = fs.readFileSync(demoFilePath, 'utf-8');
  const demoData = JSON.parse(rawJson);

  console.log(`[2/4] Validando perfil de negocio contra JSON Schema Draft 2020-12...`);
  const validacion = validarNegocio(demoData);

  if (!validacion.valido || !validacion.datos) {
    console.error('❌ Error de validación en los datos de demostración:');
    for (const err of validacion.errores) {
      console.error(`   - [${err.campo}]: ${err.mensaje}`);
    }
    process.exit(1);
  }

  console.log('✅ Validación exitosa. Perfil de negocio verificado:');
  console.log(`   - Nombre Comercial: ${validacion.datos.nombre_comercial}`);
  console.log(`   - Slug: ${validacion.datos.slug}`);
  console.log(`   - Rubro: ${validacion.datos.rubro}`);
  console.log(`   - Módulos Activos: ${validacion.datos.modulos_seleccionados.join(', ')}`);

  console.log(`\n[3/4] Ejecutando motor de generación documental en memoria...`);
  const proyecto = generarProyecto(validacion.datos, {
    fecha: '2026-10-11',
    version: '1.0.0',
  });

  console.log(`✅ Proyecto generado exitosamente:`);
  console.log(`   - Total de archivos generados: ${proyecto.totalArchivos}`);

  console.log(`\n[4/4] Escribiendo archivos en directorio local ignorado (output/${proyecto.slug})...`);
  const outputBaseDir = path.resolve(__dirname, `../output/${proyecto.slug}`);

  // Limpiar y crear directorio destino
  if (fs.existsSync(outputBaseDir)) {
    fs.rmSync(outputBaseDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outputBaseDir, { recursive: true });

  console.log(`\n📁 Árbol de archivos generados:`);
  console.log(`${proyecto.slug}/`);

  for (const archivo of proyecto.archivos) {
    const destinoCompleto = path.join(outputBaseDir, archivo.ruta);
    fs.mkdirSync(path.dirname(destinoCompleto), { recursive: true });
    fs.writeFileSync(destinoCompleto, archivo.contenido, 'utf-8');

    const desc = archivo.descripcion ? ` — ${archivo.descripcion}` : '';
    console.log(`   ├── ${archivo.ruta} (${archivo.contenido.length} bytes)${desc}`);
  }

  console.log(`\n✨ Éxito: Proyecto de contexto empresarial generado correctamente en:`);
  console.log(`   ${outputBaseDir}\n`);
}

main().catch((err) => {
  console.error('❌ Error inesperado durante la ejecución demo:', err);
  process.exit(1);
});
