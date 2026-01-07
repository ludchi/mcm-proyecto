const { executeQuery } = require('../config/database');

async function obtenerKPIs(req, res, next) {
  try {
    const result = await executeQuery(`
      SELECT 
        (SELECT COUNT(*) FROM Lotes WHERE Estado='Activo') as LotesActivos,
        (SELECT COUNT(*) FROM Lotes WHERE DATEDIFF(DAY,GETDATE(),FechaCaducidad) BETWEEN 1 AND 7) as ProximosCaducar,
        (SELECT COUNT(*) FROM Productos WHERE StockActual <= StockMinimo) as ProductosBajos,
        (SELECT COUNT(*) FROM Alertas WHERE Estado='Activa') as AlertasPendientes
    `);

    res.json({ kpis: result.recordset });
  } catch (error) {
    next(error);
  }
}

module.exports = { obtenerKPIs };
