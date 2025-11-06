import { readFile, writeFile, readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Función recursiva para buscar archivos .js
async function findJsFiles(dir, fileList = []) {
  const files = await readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const filePath = join(dir, file.name);
    
    if (file.isDirectory()) {
      await findJsFiles(filePath, fileList);
    } else if (file.name.endsWith('.js')) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

async function fixExports() {
  try {
    // Buscar todos los archivos JS en blocks
    const blocksDir = join(rootDir, 'blocks');
    const files = await findJsFiles(blocksDir);
    
    console.log(`📝 Encontrados ${files.length} archivos para procesar...`);
    
    let processedCount = 0;
    
    for (const file of files) {
      let content = await readFile(file, 'utf-8');
      const originalContent = content;
      
      // Patrón 1: async function con export { name as default }
      content = content.replace(
        /async function (\w+)\((.*?)\)\s*\{([\s\S]*?)\}\s*export\s*\{\s*\1\s+as\s+default\s*\};?\s*$/m,
        'export default async function $1($2) {$3}'
      );
      
      // Patrón 2: function normal con export { name as default }
      content = content.replace(
        /function (\w+)\((.*?)\)\s*\{([\s\S]*?)\}\s*export\s*\{\s*\1\s+as\s+default\s*\};?\s*$/m,
        'export default function $1($2) {$3}'
      );
      
      // Patrón 3: Con comentario intermedio
      content = content.replace(
        /async function (\w+)\((.*?)\)\s*\{([\s\S]*?)\}\s*(?:\/\/[^\n]*\n)*\s*export\s*\{\s*\1\s+as\s+default\s*\};?/,
        'export default async function $1($2) {$3}'
      );
      
      if (content !== originalContent) {
        // Asegurar que termine con un salto de línea
        if (!content.endsWith('\n')) {
          content += '\n';
        }
        await writeFile(file, content, 'utf-8');
        processedCount++;
        console.log(`✅ Corregido: ${file.replace(rootDir, '')}`);
      }
    }
    
    console.log(`\n🎉 Proceso completado: ${processedCount} archivo(s) corregido(s)`);
    
    // Ejecutar prettier y eslint después de corregir los exports
    if (processedCount > 0) {
      console.log('\n🎨 Formateando archivos con prettier...');
      try {
        execSync('npx prettier --write "blocks/**/*.js" "scripts/config/**/*.js" "scripts/helpers/**/*.js"', { 
          cwd: rootDir,
          stdio: 'inherit'
        });
        console.log('✅ Formateo con Prettier completado');
        
        console.log('\n🔧 Aplicando reglas de ESLint...');
        execSync('npx eslint "blocks/**/*.js" "scripts/config/**/*.js" "scripts/helpers/**/*.js" --fix', {
          cwd: rootDir,
          stdio: 'inherit'
        });
        console.log('✅ ESLint aplicado correctamente');
        
        console.log('\n✨ Código formateado y linted correctamente');
      } catch (error) {
        console.error('⚠️  Error al formatear/lint:', error.message);
      }
    }
  } catch (error) {
    console.error('❌ Error al procesar archivos:', error);
    process.exit(1);
  }
}

fixExports();