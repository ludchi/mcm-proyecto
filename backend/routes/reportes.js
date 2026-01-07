const { executeQuery } = require('../config/database');
const logger = require('../middleware/logging');

async function generarReporte(req, res, next) {
  try {
    const { tipo = 'general', fechaInicio, fechaFin } = req.query;

    let query = '';

    if (tipo === 'lotes') {
      query = `SELECT COUNT(*) as TotalLotes, 
                      SUM(PesoActual) as PesoTotal,
                      COUNT(CASE WHEN Estado = 'Activo' THEN 1 END) as LotesActivos
               FROM Lotes
               WHERE FechaCreacion BETWEEN '${fechaInicio}' AND '${fechaFin}'`;
    } else if (tipo === 'productos') {
      query = `SELECT Nombre, StockActual, StockMinimo, 
                      CASE WHEN StockActual <= StockMinimo THEN 'Stock Bajo' ELSE 'Normal' END as Estado
               FROM Productos
               ORDER BY StockActual ASC`;
    } else {
      query = `SELECT 
                (SELECT COUNT(*) FROM Lotes WHERE Estado = 'Activo') as TotalLotes,
                (SELECT COUNT(*) FROM Productos) as TotalProductos,
                (SELECT COUNT(*) FROM Usuarios) as TotalUsuarios`;
    }

    const result = await executeQuery(query, {});
    logger.info(`✅ Reporte generado: ${tipo}`);

    res.json({
      tipo,
      fecha: new Date(),
      datos: result.recordset
    });
  } catch (error) {
    logger.error('❌ Error generando reporte:', error.message);
    next(error);
  }
}

module.exports = { generarReporte };
