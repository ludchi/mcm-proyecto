const { executeQuery } = require('../config/database');
const logger = require('../middleware/logging');

async function obtenerKPIs(req, res, next) {
  try {
    const kpis = await executeQuery(
      `SELECT 
        (SELECT COUNT(*) FROM Lotes WHERE Estado = 'Activo') as LotesActivos,
        (SELECT COUNT(*) FROM Productos WHERE StockActual <= StockMinimo) as ProductosBajoStock,
        (SELECT COUNT(*) FROM Lotes WHERE DATEDIFF(DAY, GETDATE(), FechaCaducidad) BETWEEN 1 AND 7) as LotesCaducidadProxima,
        (SELECT SUM(StockActual) FROM Productos) as StockTotal`,
      {}
    );

    logger.info('✅ KPIs obtenidos');
    res.json({
      kpis: kpis.recordset[0],
      timestamp: new Date()
    });
  } catch (error) {
    logger.error('❌ Error obteniendo KPIs:', error.message);
    next(error);
  }
}

module.exports = { obtenerKPIs };
