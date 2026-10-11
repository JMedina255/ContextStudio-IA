import type { PerfilNegocio, OpcionesGeneracion } from '../types/index.js';
import { escapeMarkdownTableCell, formatPrecio, formatBulletList } from '../utils/markdown.js';

export interface VariablesContexto {
  // Identificadores y datos base
  slug_negocio: string;
  nombre_negocio: string;
  rubro: string;
  descripcion_negocio: string;
  mision: string;
  has_mision: boolean;
  vision: string;
  has_vision: boolean;

  // Ubicación
  direccion: string;
  ciudad_pais: string;
  es_digital: boolean;

  // Contactos
  telefono: string;
  whatsapp: string;
  email: string;
  sitio_web: string;
  contactos_resumidos: string;
  contactos_bloque: string;
  redes_sociales_bloque: string;
  has_redes_sociales: boolean;

  // Catálogo y ofertas
  tabla_productos_servicios: string;
  tabla_productos: string;
  tabla_servicios: string;
  has_productos: boolean;
  has_servicios: boolean;
  productos_destacados: string;

  // Audiencia y metas
  perfil_audiencia: string;
  publico_resumido: string;
  metas_comerciales: string;
  llamadas_accion: string;
  contacto_cta: string;

  // Identidad visual
  tono_voz: string;
  tono_comunicacion: string;
  personalidad_marca: string;
  paleta_colores: string;
  paleta_resumida: string;
  colores_marca: string;
  tipografias: string;
  pautas_fotograficas: string;
  restricciones_esteticas: string;
  estilo_visual: string;

  // Plataformas de video
  canales_video: string;

  // Metadatos
  fecha_generacion: string;
  version_generador: string;
  modulos_activos_texto: string;
}

/**
 * Transforma un PerfilNegocio validado en un conjunto de variables normalizadas listas para el motor de plantillas.
 */
export function normalizarNegocio(
  perfil: PerfilNegocio,
  opciones?: OpcionesGeneracion
): VariablesContexto {
  const fechaGeneracion = opciones?.fecha || new Date().toISOString().split('T')[0];
  const versionGenerador = opciones?.version || '1.0.0';

  // 1. Datos base y ubicación
  const esDigital = perfil.ubicacion?.es_digital ?? false;
  let direccion = perfil.ubicacion?.direccion || '[No especificado]';
  if (esDigital && (!perfil.ubicacion?.direccion || perfil.ubicacion.direccion === '[No especificado]')) {
    direccion = 'Operación 100% digital (sin sede física de atención al público)';
  }

  const partesCiudadPais = [perfil.ubicacion?.ciudad, perfil.ubicacion?.pais].filter(Boolean);
  const ciudadPais = partesCiudadPais.length > 0 ? partesCiudadPais.join(', ') : '[No especificado]';

  // 2. Canales de contacto
  const telefono = perfil.contactos.telefono || '[No especificado]';
  const whatsapp = perfil.contactos.whatsapp || '[No especificado]';
  const email = perfil.contactos.email || '[No especificado]';
  const sitioWeb = perfil.contactos.sitio_web || '[No especificado]';

  const contactosDisponibles: string[] = [];
  if (perfil.contactos.whatsapp) contactosDisponibles.push(`WhatsApp: ${perfil.contactos.whatsapp}`);
  if (perfil.contactos.telefono) contactosDisponibles.push(`Tel: ${perfil.contactos.telefono}`);
  if (perfil.contactos.email) contactosDisponibles.push(`Email: ${perfil.contactos.email}`);
  if (perfil.contactos.sitio_web) contactosDisponibles.push(`Web: ${perfil.contactos.sitio_web}`);

  const contactosResumidos =
    contactosDisponibles.length > 0 ? contactosDisponibles.join(' | ') : '[No especificados]';

  const contactosBloque = [
    `- **Teléfono Oficial:** ${telefono}`,
    `- **WhatsApp Business:** ${whatsapp}`,
    `- **Correo Electrónico:** ${email}`,
    `- **Sitio Web:** ${sitioWeb}`,
  ].join('\n');

  // Redes sociales
  const redes: string[] = [];
  if (perfil.redes_sociales?.instagram) redes.push(`- **Instagram:** ${perfil.redes_sociales.instagram}`);
  if (perfil.redes_sociales?.facebook) redes.push(`- **Facebook:** ${perfil.redes_sociales.facebook}`);
  if (perfil.redes_sociales?.tiktok) redes.push(`- **TikTok:** ${perfil.redes_sociales.tiktok}`);
  if (perfil.redes_sociales?.linkedin) redes.push(`- **LinkedIn:** ${perfil.redes_sociales.linkedin}`);
  if (perfil.redes_sociales?.youtube) redes.push(`- **YouTube:** ${perfil.redes_sociales.youtube}`);

  const redesSocialesBloque =
    redes.length > 0 ? redes.join('\n') : '*No se registraron redes sociales oficiales.*';

  // 3. Catálogo de productos y servicios
  const productos = perfil.productos || [];
  const servicios = perfil.servicios || [];
  const hasProductos = productos.length > 0;
  const hasServicios = servicios.length > 0;

  // Tabla unificada para 00_NEGOCIO.md
  let tablaProductosServicios = '';
  const filasUnificadas: string[] = [];

  for (const p of productos) {
    const nombre = escapeMarkdownTableCell(p.nombre);
    const desc = escapeMarkdownTableCell(p.descripcion);
    const beneficio = escapeMarkdownTableCell(p.beneficios?.[0] || '[No especificado]');
    const precio = escapeMarkdownTableCell(formatPrecio(p.precio));
    filasUnificadas.push(`| ${nombre} | Producto | ${desc} | ${beneficio} | ${precio} |`);
  }

  for (const s of servicios) {
    const nombre = escapeMarkdownTableCell(s.nombre);
    const desc = escapeMarkdownTableCell(s.descripcion);
    const beneficio = escapeMarkdownTableCell(s.beneficios?.[0] || '[No especificado]');
    const precio = escapeMarkdownTableCell(formatPrecio(s.precio));
    filasUnificadas.push(`| ${nombre} | Servicio | ${desc} | ${beneficio} | ${precio} |`);
  }

  if (filasUnificadas.length > 0) {
    tablaProductosServicios = [
      '| Nombre | Tipo | Descripción | Beneficio Principal | Precio Oficial |',
      '| :--- | :--- | :--- | :--- | :--- |',
      ...filasUnificadas,
    ].join('\n');
  } else {
    tablaProductosServicios = '*No se registraron productos ni servicios en el perfil inicial.*';
  }

  // Tabla detallada de productos para 02_PRODUCTOS_SERVICIOS.md
  let tablaProductos = '';
  if (hasProductos) {
    const filasP = productos.map((p) => {
      const id = escapeMarkdownTableCell(p.id);
      const nombre = escapeMarkdownTableCell(p.nombre);
      const desc = escapeMarkdownTableCell(p.descripcion);
      const beneficios = escapeMarkdownTableCell(
        p.beneficios && p.beneficios.length > 0 ? p.beneficios.join(', ') : '[No especificado]'
      );
      const precio = escapeMarkdownTableCell(formatPrecio(p.precio));
      return `| ${id} | ${nombre} | ${desc} | ${beneficios} | ${precio} |`;
    });
    tablaProductos = [
      '| ID | Nombre | Descripción | Beneficios Clave | Precio Oficial |',
      '| :--- | :--- | :--- | :--- | :--- |',
      ...filasP,
    ].join('\n');
  } else {
    tablaProductos = '*No se registraron productos físicos o digitales.*';
  }

  // Tabla detallada de servicios para 02_PRODUCTOS_SERVICIOS.md
  let tablaServicios = '';
  if (hasServicios) {
    const filasS = servicios.map((s) => {
      const id = escapeMarkdownTableCell(s.id);
      const nombre = escapeMarkdownTableCell(s.nombre);
      const modalidad = escapeMarkdownTableCell(s.modalidad || 'no_especificado');
      const desc = escapeMarkdownTableCell(s.descripcion);
      const beneficios = escapeMarkdownTableCell(
        s.beneficios && s.beneficios.length > 0 ? s.beneficios.join(', ') : '[No especificado]'
      );
      const precio = escapeMarkdownTableCell(formatPrecio(s.precio));
      return `| ${id} | ${nombre} | ${modalidad} | ${desc} | ${beneficios} | ${precio} |`;
    });
    tablaServicios = [
      '| ID | Nombre | Modalidad | Descripción | Beneficios Clave | Precio Oficial |',
      '| :--- | :--- | :--- | :--- | :--- | :--- |',
      ...filasS,
    ].join('\n');
  } else {
    tablaServicios = '*No se registraron servicios profesionales.*';
  }

  // Productos/servicios destacados resumidos
  const nombresOfertas = [
    ...productos.map((p) => p.nombre),
    ...servicios.map((s) => s.nombre),
  ];
  const productosDestacados =
    nombresOfertas.length > 0 ? nombresOfertas.slice(0, 3).join(', ') : perfil.nombre_comercial;

  // 4. Audiencia y metas comerciales
  const pub = perfil.publico_objetivo;
  const partesAudiencia: string[] = [];
  if (pub?.perfil_demografico) {
    partesAudiencia.push(`### Perfil Demográfico\n${pub.perfil_demografico}`);
  }
  if (pub?.perfil_psicografico) {
    partesAudiencia.push(`### Perfil Psicográfico\n${pub.perfil_psicografico}`);
  }
  if (pub?.puntos_dolor && pub.puntos_dolor.length > 0) {
    partesAudiencia.push(`### Puntos de Dolor y Necesidades\n${formatBulletList(pub.puntos_dolor)}`);
  }
  if (pub?.motivadores_compra && pub.motivadores_compra.length > 0) {
    partesAudiencia.push(`### Motivadores de Compra\n${formatBulletList(pub.motivadores_compra)}`);
  }
  if (pub?.objeciones_comunes && pub.objeciones_comunes.length > 0) {
    partesAudiencia.push(`### Objeciones Frecuentes\n${formatBulletList(pub.objeciones_comunes)}`);
  }

  const perfilAudiencia =
    partesAudiencia.length > 0
      ? partesAudiencia.join('\n\n')
      : '*Público objetivo pendiente de definición detallada por parte del usuario.*';

  const publicoResumido =
    pub?.perfil_demografico ||
    pub?.perfil_psicografico ||
    `Clientes interesados en ${perfil.rubro}`;

  const metasComerciales = formatBulletList(
    perfil.objetivos_comerciales?.metas_principales,
    '- Consolidar presencia comercial y generar prospectos calificados.'
  );

  const llamadasAccion = formatBulletList(
    perfil.objetivos_comerciales?.llamadas_a_la_accion_principales,
    `- Contactar al canal oficial: ${perfil.contactos.whatsapp || perfil.contactos.email || perfil.contactos.sitio_web || 'Canal oficial'}`
  );

  const contactoCta =
    perfil.contactos.whatsapp
      ? `WhatsApp oficial: ${perfil.contactos.whatsapp}`
      : perfil.contactos.sitio_web
        ? `Sitio web: ${perfil.contactos.sitio_web}`
        : perfil.contactos.email
          ? `Correo: ${perfil.contactos.email}`
          : 'Canal oficial de atención';

  // 5. Identidad visual y estilo
  const idVisual = perfil.identidad_visual;
  const tonoVoz = idVisual?.tono_voz || 'Profesional, claro y empático.';
  const tonoComunicacion = tonoVoz;

  const personalidadMarca =
    idVisual?.personalidad_marca && idVisual.personalidad_marca.length > 0
      ? idVisual.personalidad_marca.join(', ')
      : 'Profesional, confiable y enfocado en el cliente.';

  // Colores
  const colores = idVisual?.paleta_colores || [];
  let paletaColores = '';
  let paletaResumida = '';

  if (colores.length > 0) {
    const filasC = colores.map((c) => {
      const nombre = escapeMarkdownTableCell(c.nombre);
      const hex = escapeMarkdownTableCell(c.hex);
      const uso = escapeMarkdownTableCell(c.uso);
      return `| ${nombre} | \`${hex}\` | ${uso} |`;
    });
    paletaColores = [
      '| Color | Código HEX | Función / Aplicación |',
      '| :--- | :--- | :--- |',
      ...filasC,
    ].join('\n');
    paletaResumida = colores.map((c) => `${c.nombre} (${c.hex})`).join(', ');
  } else {
    paletaColores = '*No se especificaron códigos cromáticos oficiales.*';
    paletaResumida = '[No especificada por el usuario]';
  }

  // Tipografías
  const tipografias = [
    `- **Tipografía Principal / Titulares:** ${idVisual?.tipografias?.principal || '[No especificada]'}`,
    `- **Tipografía Secundaria / Cuerpos:** ${idVisual?.tipografias?.secundaria || '[No especificada]'}`,
  ].join('\n');

  // Restricciones estéticas
  const restriccionesEsteticas = formatBulletList(
    idVisual?.restricciones_esteticas,
    '- No utilizar elementos visuales discordantes con la identidad corporativa.'
  );

  // Estilo visual e iluminación
  const estiloVisual = `Luz limpia y natural, composición ordenada inspirada en ${perfil.rubro}, atmósfera coherente con ${personalidadMarca}.`;

  const canalesVideo =
    perfil.redes_sociales?.tiktok || perfil.redes_sociales?.instagram
      ? 'Instagram Reels, TikTok y YouTube Shorts'
      : 'Plataformas digitales de video';

  const pautasFotograficas = [
    `- **Enfoque:** Fotografías nítidas, bien iluminadas y centradas en el producto/servicio real.`,
    `- **Atmósfera:** ${estiloVisual}`,
    `- **Consistencia:** Mantener fidelidad cromática con la paleta: ${paletaResumida}.`,
  ].join('\n');

  const modulosActivosTexto = perfil.modulos_seleccionados.join(', ');

  return {
    slug_negocio: perfil.slug,
    nombre_negocio: perfil.nombre_comercial,
    rubro: perfil.rubro,
    descripcion_negocio: perfil.descripcion,
    mision: perfil.mision || '[No especificado]',
    has_mision: Boolean(perfil.mision && perfil.mision !== '[No especificado]'),
    vision: perfil.vision || '[No especificado]',
    has_vision: Boolean(perfil.vision && perfil.vision !== '[No especificado]'),

    direccion,
    ciudad_pais: ciudadPais,
    es_digital: esDigital,

    telefono,
    whatsapp,
    email,
    sitio_web: sitioWeb,
    contactos_resumidos: contactosResumidos,
    contactos_bloque: contactosBloque,
    redes_sociales_bloque: redesSocialesBloque,
    has_redes_sociales: redes.length > 0,

    tabla_productos_servicios: tablaProductosServicios,
    tabla_productos: tablaProductos,
    tabla_servicios: tablaServicios,
    has_productos: hasProductos,
    has_servicios: hasServicios,
    productos_destacados: productosDestacados,

    perfil_audiencia: perfilAudiencia,
    publico_resumido: publicoResumido,
    metas_comerciales: metasComerciales,
    llamadas_accion: llamadasAccion,
    contacto_cta: contactoCta,

    tono_voz: tonoVoz,
    tono_comunicacion: tonoComunicacion,
    personalidad_marca: personalidadMarca,
    paleta_colores: paletaColores,
    paleta_resumida: paletaResumida,
    colores_marca: paletaResumida,
    tipografias,
    pautas_fotograficas: pautasFotograficas,
    restricciones_esteticas: restriccionesEsteticas,
    estilo_visual: estiloVisual,

    canales_video: canalesVideo,

    fecha_generacion: fechaGeneracion,
    version_generador: versionGenerador,
    modulos_activos_texto: modulosActivosTexto,
  };
}
