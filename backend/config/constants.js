const ROLES = {
  ADMIN: 'admin',
  ALMACENISTA: 'almacenista',
  BARISTA: 'barista'
};

const ESTADOS_LOTE = {
  ACTIVO: 'Activo',
  STOCK_BAJO: 'Stock Bajo',
  POR_CADUCAR: 'Por Caducar',
  ELIMINADO: 'Eliminado'
};

const TIPOS_TUESTE = {
  CLARO: 'Claro',
  MEDIO: 'Medio',
  OSCURO: 'Oscuro',
  MEDIO_OSCURO: 'Medio Oscuro'
};

const ACCIONES_AUDITORIA = {
  CREAR: 'CREAR',
  ACTUALIZAR: 'ACTUALIZAR',
  ELIMINAR: 'ELIMINAR',
  CONSULTAR: 'CONSULTAR',
  LOGIN: 'LOGIN'
};

const PRIORIDADES_ALERTA = {
  BAJA: 'Baja',
  MEDIA: 'Media',
  ALTA: 'Alta'
};

const TIPOS_ALERTA = {
  CADUCIDAD: 'Caducidad',
  STOCK_BAJO: 'Stock Bajo',
  SISTEMA: 'Sistema'
};

module.exports = {
  ROLES,
  ESTADOS_LOTE,
  TIPOS_TUESTE,
  ACCIONES_AUDITORIA,
  PRIORIDADES_ALERTA,
  TIPOS_ALERTA
};
