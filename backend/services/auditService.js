// ✅ ARCHIVO: backend/services/auditService.js
// Servicio de auditoría para registrar cambios en la BD

const { executeQuery, sql } = require('../config/database');
const logger = require('../middleware/logging');

async function registrarAuditoria(tabla, accion, registroId, usuarioId, cambios = null) {
  try {
    await executeQuery(
      `INSERT INTO Auditoria (Tabla, Accion, RegistroId, UsuarioId, Fecha, Cambios)
       VALUES (@tabla, @accion, @registroId, @usuarioId, GETDATE(), @cambios)`,
      {
        tabla: { type: sql.VarChar(50), value: tabla },
        accion: { type: sql.VarChar(20), value: accion },
        registroId: { type: sql.Int, value: registroId },
        usuarioId: { type: sql.Int, value: usuarioId },
        cambios: { type: sql.NVarChar(1000), value: cambios ? JSON.stringify(cambios) : null }
      }
    );
    logger.info(`✅ Auditoría: ${tabla}.${accion} (ID: ${registroId})`);
  } catch (error) {
    logger.error('❌ Error auditoría:', error.message);
  }
}

async function listarAuditoria(pagina = 1, itemsPorPagina = 50) {
  try {
    const offset = (pagina - 1) * itemsPorPagina;
    const result = await executeQuery(
      `SELECT TOP 100 a.*, u.Codigo AS Usuario FROM Auditoria a
       INNER JOIN Usuarios u ON a.UsuarioId = u.Id
       ORDER BY a.Fecha DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`,
      {
        offset: { type: sql.Int, value: offset },
        limit: { type: sql.Int, value: itemsPorPagina }
      }
    );
    return result.recordset;
  } catch (error) {
    logger.error('❌ Error listando auditoría:', error.message);
    throw error;
  }
}

module.exports = { registrarAuditoria, listarAuditoria };