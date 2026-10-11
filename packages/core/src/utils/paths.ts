/**
 * Valida que una ruta relativa sea segura y permanezca confinada dentro del directorio raíz del proyecto.
 * Previene ataques de Path Traversal (../, barras iniciales absolutas, unidades de disco de Windows, etc.).
 */
export function isPathSafe(relativePath: string): boolean {
  if (!relativePath || typeof relativePath !== 'string') {
    return false;
  }

  // Normalizar separadores a barra diagonal
  const normalized = relativePath.replace(/\\/g, '/');

  // No permitir rutas absolutas (POSIX o Windows)
  if (normalized.startsWith('/') || /^[a-zA-Z]:/.test(normalized)) {
    return false;
  }

  // Descomponer en segmentos y comprobar que ninguno sea '..' ni '.'
  const segments = normalized.split('/');
  for (const seg of segments) {
    if (seg === '..' || seg === '.') {
      return false;
    }
  }

  // Comprobar caracteres no permitidos en nombres de archivos
  if (/[<>:"|?*]/.test(normalized)) {
    return false;
  }

  return true;
}

/**
 * Normaliza y limpia una ruta relativa asegurando que no contenga barras repetidas ni espacios espurios.
 */
export function normalizeSafePath(relativePath: string): string {
  if (!isPathSafe(relativePath)) {
    throw new Error(`Ruta insegura o no permitida detectada: '${relativePath}'`);
  }
  return relativePath.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/^\//, '').trim();
}
