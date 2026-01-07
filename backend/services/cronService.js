// ✅ ARCHIVO: backend/services/cronService.js
// Servicio de tareas programadas con node-cron

const cron = require('node-cron');
const { executeQuery, sql } = require('../config/database');
const { enviarAlertaCaducidad, enviarAlertaStockBajo } = require('./emailService');
const logger = require('../middleware/logging');

/**
 * Inicia el servicio de alertas programadas
 * Se ejecuta diariamente a las 08:00 AM
 */
function iniciarServicioCron() {
  // Tarea diaria: revisar lotes próximos a caducar
  cron.schedule('0 8 * * *', async () => {
    logger.info('🔄 Iniciando chequeo diario de caducidades...');
    await chequearCaducidades();
  });

  // Tarea diaria: revisar stock bajo
  cron.schedule('0 8 * * *', async () => {
    logger.info('🔄 Iniciando chequeo diario de stock bajo...');
    await chequearStockBajo();
  });

  logger.info('✅ Servicio cron inicializado');
}

/**
 * Busca lotes próximos a caducar (1-7 días)
 */
async function chequearCaducidades() {
  try {
    const resultado = await executeQuery(`
      SELECT l.*, u.Email
      FROM Lotes l
      INNER JOIN Usuarios u ON l.UsuarioCreadorId = u.Id
      WHERE l.Estado = 'Activo'
      AND DATEDIFF(DAY, GETDATE(), l.FechaCaducidad) BETWEEN 1 AND 7
    `);

    if (resultado.recordset.length > 0) {
      for (const lote of resultado.recordset) {
        await enviarAlertaCaducidad(
          lote.Email,
          lote.Codigo,
          lote.FechaCaducidad.toISOString().split('T')[0]
        );
      }
      logger.info(`✅ ${resultado.recordset.length} alertas de caducidad enviadas`);
    } else {
      logger.info('✅ No hay lotes próximos a caducar');
    }
  } catch (error) {
    logger.error('❌ Error en chequearCaducidades:', error.message);
  }
}

/**
 * Busca productos con stock bajo
 */
async function chequearStockBajo() {
  try {
    const resultado = await executeQuery(`
      SELECT p.*, u.Email
      FROM Productos p
      CROSS JOIN (SELECT TOP 1 Email FROM Usuarios WHERE Rol = 'admin') u
      WHERE p.StockActual <= p.StockMinimo
      AND p.Estado != 'Eliminado'
    `);

    if (resultado.recordset.length > 0) {
      for (const producto of resultado.recordset) {
        await enviarAlertaStockBajo(
          producto.Email,
          producto.Nombre,
          producto.StockActual
        );
      }
      logger.info(`✅ ${resultado.recordset.length} alertas de stock bajo enviadas`);
    } else {
      logger.info('✅ Stock en niveles normales');
    }
  } catch (error) {
    logger.error('❌ Error en chequearStockBajo:', error.message);
  }
}

/**
 * Detiene el servicio de cron
 */
function detenerServicioCron() {
  cron.getTasks().forEach(task => task.stop());
  logger.info('✅ Servicio cron detenido');
}

module.exports = {
  iniciarServicioCron,
  detenerServicioCron,
  chequearCaducidades,
  chequearStockBajo
};