import { describe, it, expect } from 'vitest';
import { validarNegocio } from '../src/validation/validator.js';
import demoData from '../../../ejemplos/negocio.demo.json' with { type: 'json' };

describe('Módulo de Validación: validarNegocio', () => {
  it('debe validar exitosamente un negocio demo completo y correcto', () => {
    const res = validarNegocio(demoData);
    expect(res.valido).toBe(true);
    expect(res.errores).toHaveLength(0);
    expect(res.datos?.slug).toBe('kafi-nova-tostaduria');
  });

  it('debe rechazar entradas que no sean objetos (null, arreglos, primitivos)', () => {
    expect(validarNegocio(null).valido).toBe(false);
    expect(validarNegocio(undefined).valido).toBe(false);
    expect(validarNegocio([]).valido).toBe(false);
    expect(validarNegocio('cadena').valido).toBe(false);
    expect(validarNegocio(123).valido).toBe(false);
  });

  it('debe fallar si faltan campos obligatorios de primer nivel', () => {
    const copia = { ...demoData } as Record<string, unknown>;
    delete copia.nombre_comercial;
    const res = validarNegocio(copia);
    expect(res.valido).toBe(false);
    expect(res.errores.some((e) => e.campo.includes('nombre_comercial') || e.mensaje.includes('nombre_comercial'))).toBe(true);
  });

  it('debe rechazar slugs con caracteres inválidos (mayúsculas, espacios, símbolos)', () => {
    const invalidoSlug = { ...demoData, slug: 'Mi Negocio_Invalido!' };
    const res = validarNegocio(invalidoSlug);
    expect(res.valido).toBe(false);
    expect(res.errores.some((e) => e.campo.includes('slug'))).toBe(true);
  });

  it('debe rechazar módulos desconocidos no incluidos en el enum oficial', () => {
    const moduloInvalido = {
      ...demoData,
      modulos_seleccionados: ['MOD-01', 'MOD-99'],
    };
    const res = validarNegocio(moduloInvalido);
    expect(res.valido).toBe(false);
    expect(res.errores.some((e) => e.mensaje.includes('MOD-99') || e.campo.includes('modulos_seleccionados'))).toBe(true);
  });

  it('debe rechazar si modulos_seleccionados está vacío (minItems: 1)', () => {
    const sinModulos = {
      ...demoData,
      modulos_seleccionados: [],
    };
    const res = validarNegocio(sinModulos);
    expect(res.valido).toBe(false);
    expect(res.errores.some((e) => e.regla === 'minItems')).toBe(true);
  });

  it('debe rechazar textos que no cumplan minLength (ej. descripcion < 10 caracteres)', () => {
    const descCorta = {
      ...demoData,
      descripcion: 'Corta',
    };
    const res = validarNegocio(descCorta);
    expect(res.valido).toBe(false);
    expect(res.errores.some((e) => e.regla === 'minLength')).toBe(true);
  });

  it('debe rechazar correos electrónicos con formato inválido', () => {
    const emailInvalido = {
      ...demoData,
      contactos: {
        ...demoData.contactos,
        email: 'correo_sin_arroba_ni_dominio',
      },
    };
    const res = validarNegocio(emailInvalido);
    expect(res.valido).toBe(false);
    expect(res.errores.some((e) => e.campo.includes('email') || e.mensaje.includes('correo'))).toBe(true);
  });

  it('debe rechazar URLs con formato inválido en sitio web', () => {
    const webInvalida = {
      ...demoData,
      contactos: {
        ...demoData.contactos,
        sitio_web: 'ht tp://invalido',
      },
    };
    const res = validarNegocio(webInvalida);
    expect(res.valido).toBe(false);
    expect(res.errores.some((e) => e.campo.includes('sitio_web'))).toBe(true);
  });

  it('debe rechazar colores hexadecimales con formato incorrecto', () => {
    const colorInvalido = {
      ...demoData,
      identidad_visual: {
        ...demoData.identidad_visual,
        paleta_colores: [
          { nombre: 'Rojo', hex: 'rojo-sin-hash', uso: 'Principal' },
        ],
      },
    };
    const res = validarNegocio(colorInvalido);
    expect(res.valido).toBe(false);
    expect(res.errores.some((e) => e.mensaje.includes('color') || e.campo.includes('hex'))).toBe(true);
  });

  it('debe rechazar productos sin id, nombre o descripcion', () => {
    const prodInvalido = {
      ...demoData,
      productos: [
        { nombre: 'Solo Nombre' },
      ],
    };
    const res = validarNegocio(prodInvalido);
    expect(res.valido).toBe(false);
  });

  it('debe rechazar propiedades adicionales no declaradas en la raíz del objeto', () => {
    const propiedadExtra = {
      ...demoData,
      propiedad_fantasma_no_permitida: 'hack',
    };
    const res = validarNegocio(propiedadExtra);
    expect(res.valido).toBe(false);
    expect(res.errores.some((e) => e.regla === 'additionalProperties')).toBe(true);
  });
});
