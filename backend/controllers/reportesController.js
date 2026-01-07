const { executeQuery } = require('../config/database');
const { generarEtiqueta: generarPDF } = require('../services/pdfService');
const logger = require('../middleware/logging');

async function generarReporte(req, res, next) {
  try {
    const { tipo = 'inventario', periodo = 'semanal' } = req.query;

    let query = '';

    if (tipo === 'inventario') {
      query = `
        SELECT L.Codigo, L.Origen, L.TipoTueste, L.PesoActual, L.FechaCaducidad, L.Estado
        FROM Lotes L
        WHERE L.Estado != 'Eliminado'
        ORDER BY L.FechaCreacion DESC
      `;
    } else if (tipo === 'mermas') {
      query = `
        SELECT L.Codigo, L.Origen, (L.PesoInicial - L.PesoActual) as Merma, 
               ((L.PesoInicial - L.PesoActual) * 100 / L.PesoInicial) as PorcentajeMerma
        FROM Lotes L
        WHERE L.Estado = 'Eliminado'
      `;
    }

    const result = await executeQuery(query);

    logger.info(`✅ Reporte ${tipo} generado`);

    res.json({
      reporte: {
        tipo,
        periodo,
        fecha: new Date(),
        datos: result.recordset
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { generarReporte };
