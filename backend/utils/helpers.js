// Funciones auxiliares reutilizables - SIN ERRORES

const { FORMATOS, LIMITES } = require('./constants');
const logger = require('../middleware/logging');

/**
 * Formatear fecha a formato legible
 * @param {Date} fecha - Fecha a formatear
 * @param {string} tipo - 'corta' o 'completa'
 */
function formatearFecha(fecha, tipo = 'corta') {
  if (!fecha) return '';
  const f = new Date(fecha);
  
  if (tipo === 'corta') {
    return f.toLocaleDateString('es-MX');
  } else if (tipo === 'completa') {
    return f.toLocaleDateString('es-MX') + ' ' + f.toLocaleTimeString('es-MX');
  }
  return f.toISOString();
}

/**
 * Calcular días para caducidad
 * @param {Date} fechaCaducidad
 */
function diasParaCaducar(fechaCaducidad) {
  const hoy = new Date();
  const caducidad = new Date(fechaCaducidad);
  const diferencia = Math.floor((caducidad - hoy) / (1000 * 60 * 60 * 24));
  return diferencia;
}

/**
 * Verificar si lote está próximo a caducar
 * @param {number} dias
 */
function esProximoCaducar(dias) {
  return dias > 0 && dias <= LIMITES.DIAS_PARA_CADUCAR;
}

/**
 * Calcular porcentaje de merma
 * @param {number} pesoInicial
 * @param {number} pesoFinal
 */
function calcularMerma(pesoInicial, pesoFinal) {
  if (!pesoInicial || pesoInicial === 0) return 0;
  const merma = ((pesoInicial - pesoFinal) / pesoInicial) * 100;
  return Math.round(merma * 100) / 100;
}

/**
 * Generar código único para lote (XX-XXXXXX-XXX)
 * @param {string} origen
 */
function generarCodigoLote(origen) {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const prefijo = origen.substring(0, 2).toUpperCase();
  return `${prefijo}-${timestamp}-${random}`;
}

/**
 * Validar rango de peso - CORREGIDO: parseFloat
 */
function esPesoValido(peso) {
  const num = parseFloat(peso);
  if (isNaN(num)) return false;
  return num >= LIMITES.MIN_PESO_LOTE && num <= LIMITES.MAX_PESO_LOTE;
}

/**
 * Truncar string a longitud máxima
 */
function truncar(texto, max = 100) {
  if (!texto) return '';
  return texto.length > max ? texto.substring(0, max - 3) + '...' : texto;
}

/**
 * Sanitizar entrada para prevenir XSS e inyección SQL - CORREGIDO: incluye backticks
 */
function sanitizar(texto) {
  if (!texto) return '';
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/`/g, '&#x60;')
    .replace(/\//g, '&#x2F;')
    .replace(/;/g, '&#x3B;');
}

/**
 * Extraer IP del request - CORREGIDO: usar req.socket en lugar de req.connection
 */
function extraerIP(req) {
  return (req.headers['x-forwarded-for']?.split(',').trim() || 
         req.socket?.remoteAddress || 
         req.connection?.remoteAddress || 
         'desconocida');
}

/**
 * Paginar resultados
 */
function paginar(items, pagina = 1, itemsPorPagina = LIMITES.PAGINACION) {
  const inicio = (pagina - 1) * itemsPorPagina;
  const fin = inicio + itemsPorPagina;
  const paginados = items.slice(inicio, fin);
  
  return {
    datos: paginados,
    paginacion: {
      pagina,
      itemsPorPagina,
      total: items.length,
      totalPaginas: Math.ceil(items.length / itemsPorPagina)
    }
  };
}

/**
 * Agrupar array por propiedad
 */
function agruparPor(array, propiedad) {
  return array.reduce((grupos, item) => {
    const clave = item[propiedad];
    if (!grupos[clave]) {
      grupos[clave] = [];
    }
    grupos[clave].push(item);
    return grupos;
  }, {});
}

/**
 * Ordenar array por propiedad
 */
function ordenar(array, propiedad, direccion = 'asc') {
  return array.sort((a, b) => {
    const valA = a[propiedad];
    const valB = b[propiedad];
    
    if (typeof valA === 'string') {
      return direccion === 'asc' 
        ? valA.localeCompare(valB) 
        : valB.localeCompare(valA);
    }
    
    return direccion === 'asc' ? valA - valB : valB - valA;
  });
}

/**
 * Construir respuesta estándar de éxito
 */
function respuestaExito(data, mensaje = 'Operación exitosa', status = 200) {
  return {
    exito: true,
    status,
    mensaje,
    data,
    timestamp: new Date()
  };
}

/**
 * Construir respuesta de error
 */
function respuestaError(mensaje, status = 400, errores = null) {
  return {
    exito: false,
    status,
    mensaje,
    errores,
    timestamp: new Date()
  };
}

/**
 * Reintentar operación con backoff exponencial - CORREGIDO: captura errores específicos
 */
async function reintentar(funcion, maxReintentos = 3, delay = 1000) {
  let ultimoError = null;
  
  for (let intento = 0; intento < maxReintentos; intento++) {
    try {
      return await funcion();
    } catch (error) {
      ultimoError = error;
      
      if (intento === maxReintentos - 1) {
        logger.error(`❌ Falló después de ${maxReintentos} intentos:`, error.message);
        throw error;
      }
      
      const tiempoEspera = delay * Math.pow(2, intento);
      logger.warn(`🔄 Reintentando en ${tiempoEspera}ms... (Intento ${intento + 1}/${maxReintentos})`);
      await new Promise(resolve => setTimeout(resolve, tiempoEspera));
    }
  }
  
  throw ultimoError;
}

module.exports = {
  formatearFecha,
  diasParaCaducar,
  esProximoCaducar,
  calcularMerma,
  generarCodigoLote,
  esPesoValido,  // RENOMBRADO de esWeightValido
  truncar,
  sanitizar,
  extraerIP,
  paginar,
  agruparPor,
  ordenar,
  respuestaExito,
  respuestaError,
  reintentar
};
