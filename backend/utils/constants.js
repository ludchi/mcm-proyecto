const ROLES = {
ADMIN: 'admin',
ALMACENISTA: 'almacenista',
BARISTA: 'barista'
};
const CODIGOS_ROLES = {
admin: 1,
almacenista: 2,
barista: 3
};
const ESTADOS_LOTE = {
ACTIVO: 'Activo',
STOCK_BAJO: 'Stock Bajo',
POR_CADUCAR: 'Por Caducar',
SUSPENDIDO: 'Suspendido',
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
LOGIN: 'LOGIN',
LOGOUT: 'LOGOUT',
INTENTO_FALLIDO: 'INTENTO_FALLIDO',
ROL_ASIGNADO: 'ROL_ASIGNADO',
RESOLVER: 'RESOLVER'
};
const PRIORIDADES_ALERTA = {
BAJA: 'Baja',
MEDIA: 'Media',
ALTA: 'Alta',
CRITICA: 'Crítica'
};
const TIPOS_ALERTA = {
CADUCIDAD: 'Caducidad',
STOCK_BAJO: 'Stock Bajo',
SISTEMA: 'Sistema',
MERMA: 'Merma'
};
const ESTADOS_ALERTA = {
ACTIVA: 'Activa',
RESUELTA: 'Resuelta',
IGNORADA: 'Ignorada'
};
const TIPOS_REPORTE = {
INVENTARIO: 'inventario',
MERMAS: 'mermas',
MOVIMIENTOS: 'movimientos',
USUARIOS: 'usuarios'
};
const PERIODOS_REPORTE = {
DIARIO: 'diario',
SEMANAL: 'semanal',
MENSUAL: 'mensual'
};
const ESTADOS_COLA_IMPRESION = {
PENDIENTE: 'Pendiente',
EN_PROCESO: 'En Proceso',
IMPRESO: 'Impreso',
ERROR: 'Error'
};
const MENSAJES_SISTEMA = {
EXITO: {
LOGIN: '✅ Inicio de sesión exitoso',
LOTE_CREADO: '✅ Lote creado exitosamente',
LOTE_ACTUALIZADO: '✅ Lote actualizado correctamente',
LOTE_ELIMINADO: '✅ Lote eliminado correctamente',
PRODUCTO_CREADO: '✅ Producto creado exitosamente',
USUARIO_CREADO: '✅ Usuario creado exitosamente',
ETIQUETA_GENERADA: '✅ Etiqueta generada exitosamente'
},
ERROR: {
CREDENCIALES: '❌ Credenciales inválidas',
NO_AUTORIZADO: '❌ No tienes permiso para esta acción',
RECURSO_NO_ENCONTRADO: '❌ Recurso no encontrado',
VALIDACION: '❌ Error en validación de datos',
BASE_DATOS: '❌ Error en la base de datos',
SERVIDOR: '❌ Error interno del servidor'
},
ADVERTENCIA: {
STOCK_BAJO: '⚠️ Stock bajo detectado',
PROXIMO_CADUCAR: '⚠️ Lote próximo a caducar',
MERMA_ALTA: '⚠️ Merma superior al 5%'
}
};
const LIMITES = {
PAGINACION: 10,
REINTENTOS_BD: 3,
TIMEOUT_BD: 30000,
TIMEOUT_EMAIL: 10000,
MAX_PESO_LOTE: 1000,
MIN_PESO_LOTE: 0.1,
DIAS_PARA_CADUCAR: 7,
PORCENTAJE_MERMA_ALERTA: 5
};
const FORMATOS = {
FECHA: 'YYYY-MM-DD',
FECHA_HORA: 'YYYY-MM-DD HH:mm:ss',
FECHA_CORTA: 'DD/MM/YYYY',
MONEDA: '$'
};
module.exports = {
ROLES,
CODIGOS_ROLES,
ESTADOS_LOTE,
TIPOS_TUESTE,
ACCIONES_AUDITORIA,
PRIORIDADES_ALERTA,
TIPOS_ALERTA,
ESTADOS_ALERTA,
TIPOS_REPORTE,
PERIODOS_REPORTE,
ESTADOS_COLA_IMPRESION,
MENSAJES_SISTEMA,
LIMITES,
FORMATOS
};
