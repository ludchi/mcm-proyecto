const { executeQuery } = require('../config/database');
const logger = require('../middleware/logging');

async function obtenerAlertas(req, res, next) {
  try {
    const alertas = [];

    // Alertas de caducidad
    const caducidad = await executeQuery(
      `SELECT l.*, 'CADUCIDAD' as TipoAlerta
       FROM Lotes l
       WHERE Estado = 'Activo'
       AND DATEDIFF(DAY, GETDATE(), l.FechaCaducidad) BETWEEN 1 AND 7`,
      {}
    );

    // Alertas de stock
    const stock = await executeQuery(
      `SELECT p.*, 'STOCK_BAJO' as TipoAlerta
       FROM Productos p
       WHERE StockActual <= StockMinimo`,
      {}
    );

    alertas.push(...caducidad.recordset, ...stock.recordset);

    logger.info(`✅ ${alertas.length} alertas obtenidas`);
    res.json({
      alertas,
      total: alertas.length,
      timestamp: new Date()
    });
  } catch (error) {
    logger.error('❌ Error obteniendo alertas:', error.message);
    next(error);
  }
}

module.exports = { obtenerAlertas };
