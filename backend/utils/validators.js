// Validadores reutilizables - SIN ERRORES

const { TIPOS_TUESTE, LIMITES, ROLES } = require('./constants');

/**
 * Validar código lote (formato: XX-XXXXXX-XXX) - CORREGIDO: genera válidos dinámicamente
 */
function validarCodigoLote(codigo) {
  if (!codigo || typeof codigo !== 'string') return false;
  const regex = /^[A-Z]{2}-\d{6}-\d{3}$/;
  return regex.test(codigo.trim());
}

/**
 * Validar email - CORREGIDO: RFC 5322 simplificado
 */
function validarEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valido = regex.test(email.trim());
  
  // Validaciones adicionales
  if (valido && (email.includes('..') || email.startsWith('.') || email.endsWith('.'))) {
    return false;
  }
  return valido;
}

/**
 * Validar contraseña - CORREGIDO: incluye validación de espacios
 * Requisitos: 8+ caracteres, 1 mayúscula, 1 número, 1 especial, sin espacios
 */
function validarContrasena(contrasena) {
  if (!contrasena || typeof contrasena !== 'string') return false;
  
  // No permitir espacios
  if (/\s/.test(contrasena)) return false;
  
  // Mínimo 8 caracteres
  if (contrasena.length < 8) return false;
  
  // Al menos 1 mayúscula
  if (!/[A-Z]/.test(contrasena)) return false;
  
  // Al menos 1 número
  if (!/\d/.test(contrasena)) return false;
  
  // Al menos 1 carácter especial
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(contrasena)) return false;
  
  return true;
}

/**
 * Validar tipo de tueste
 */
function validarTipoTueste(tipo) {
  if (!tipo || typeof tipo !== 'string') return false;
  return Object.values(TIPOS_TUESTE).includes(tipo.trim());
}

/**
 * Validar peso lote - CORREGIDO: mejor manejo de conversión
 */
function validarPeso(peso) {
  if (peso === null || peso === undefined || peso === '') return false;
  
  const num = parseFloat(peso);
  
  if (isNaN(num)) return false;
  if (!isFinite(num)) return false;
  
  return num >= LIMITES.MIN_PESO_LOTE && num <= LIMITES.MAX_PESO_LOTE;
}

/**
 * Validar fechas (formato YYYY-MM-DD)
 */
function validarFecha(fecha) {
  if (!fecha || typeof fecha !== 'string') return false;
  
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(fecha)) return false;
  
  const fecha_obj = new Date(fecha + 'T00:00:00');
  return fecha_obj instanceof Date && !isNaN(fecha_obj.getTime());
}

/**
 * Validar que fechaCaducidad sea posterior a fechaTueste - CORREGIDO: valida ambas primero
 */
function validarRangoFechas(fechaTueste, fechaCaducidad) {
  if (!validarFecha(fechaTueste) || !validarFecha(fechaCaducidad)) {
    return false;
  }
  
  const tueste = new Date(fechaTueste);
  const caducidad = new Date(fechaCaducidad);
  
  return caducidad > tueste;
}

/**
 * Validar rol de usuario
 */
function validarRol(rol) {
  if (!rol || typeof rol !== 'string') return false;
  return Object.values(ROLES).includes(rol.toLowerCase());
}

/**
 * Validar stock mínimo (debe ser número positivo)
 */
function validarStockMinimo(stock) {
  if (stock === null || stock === undefined || stock === '') return false;
  
  const num = parseInt(stock);
  return !isNaN(num) && num > 0;
}

/**
 * Validar origen (no vacío, máximo 100 caracteres)
 */
function validarOrigen(origen) {
  if (!origen || typeof origen !== 'string') return false;
  
  const trimmed = origen.trim();
  return trimmed.length > 0 && trimmed.length <= 100;
}

/**
 * Validar nombre (mínimo 2, máximo 100 caracteres)
 */
function validarNombre(nombre) {
  if (!nombre || typeof nombre !== 'string') return false;
  
  const trimmed = nombre.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
}

/**
 * Validar datos lote completos - CORREGIDO: verifica existencia de propiedades
 */
function validarLoteCompleto(lote) {
  const errores = [];
  
  // Verificar que lote es un objeto
  if (!lote || typeof lote !== 'object') {
    return {
      valido: false,
      errores: ['Lote debe ser un objeto válido']
    };
  }
  
  // Validar código
  if (!lote.codigo) {
    errores.push('Código es requerido');
  } else if (!validarCodigoLote(lote.codigo)) {
    errores.push('Formato de código inválido (debe ser: XX-XXXXXX-XXX)');
  }
  
  // Validar origen
  if (!lote.origen) {
    errores.push('Origen es requerido');
  } else if (!validarOrigen(lote.origen)) {
    errores.push('Origen debe tener 1-100 caracteres');
  }
  
  // Validar tipo tueste
  if (!lote.tipoTueste) {
    errores.push('Tipo de tueste es requerido');
  } else if (!validarTipoTueste(lote.tipoTueste)) {
    errores.push('Tipo de tueste inválido');
  }
  
  // Validar peso
  if (lote.peso === undefined || lote.peso === null) {
    errores.push('Peso es requerido');
  } else if (!validarPeso(lote.peso)) {
    errores.push(`Peso debe estar entre ${LIMITES.MIN_PESO_LOTE} y ${LIMITES.MAX_PESO_LOTE} kg`);
  }
  
  // Validar fechas
  if (!lote.fechaTueste) {
    errores.push('Fecha de tueste es requerida');
  } else if (!validarFecha(lote.fechaTueste)) {
    errores.push('Fecha de tueste inválida (formato: YYYY-MM-DD)');
  }
  
  if (!lote.fechaCaducidad) {
    errores.push('Fecha de caducidad es requerida');
  } else if (!validarFecha(lote.fechaCaducidad)) {
    errores.push('Fecha de caducidad inválida (formato: YYYY-MM-DD)');
  }
  
  // Validar rango de fechas
  if (lote.fechaTueste && lote.fechaCaducidad) {
    if (!validarRangoFechas(lote.fechaTueste, lote.fechaCaducidad)) {
      errores.push('Fecha de caducidad debe ser posterior a fecha de tueste');
    }
  }
  
  return {
    valido: errores.length === 0,
    errores
  };
}

/**
 * Validar datos usuario completos - CORREGIDO: verifica existencia de propiedades
 */
function validarUsuarioCompleto(usuario) {
  const errores = [];
  
  // Verificar que usuario es un objeto
  if (!usuario || typeof usuario !== 'object') {
    return {
      valido: false,
      errores: ['Usuario debe ser un objeto válido']
    };
  }
  
  // Validar nombre
  if (!usuario.nombre) {
    errores.push('Nombre es requerido');
  } else if (!validarNombre(usuario.nombre)) {
    errores.push('Nombre debe tener 2-100 caracteres');
  }
  
  // Validar email
  if (!usuario.email) {
    errores.push('Email es requerido');
  } else if (!validarEmail(usuario.email)) {
    errores.push('Email inválido');
  }
  
  // Validar contraseña
  if (!usuario.contrasena) {
    errores.push('Contraseña es requerida');
  } else if (!validarContrasena(usuario.contrasena)) {
    errores.push('Contraseña debe tener 8+ caracteres, mayúscula, número y símbolo (sin espacios)');
  }
  
  // Validar rol
  if (!usuario.rol) {
    errores.push('Rol es requerido');
  } else if (!validarRol(usuario.rol)) {
    errores.push('Rol inválido');
  }
  
  return {
    valido: errores.length === 0,
    errores
  };
}

module.exports = {
  validarCodigoLote,
  validarEmail,
  validarContrasena,
  validarTipoTueste,
  validarPeso,
  validarFecha,
  validarRangoFechas,
  validarRol,
  validarStockMinimo,
  validarOrigen,
  validarNombre,
  validarLoteCompleto,
  validarUsuarioCompleto
};
