const { executeQuery, sql } = require('../config/database');
const { generarEtiqueta } = require('../services/pdfService');
const { generarQR } = require('../services/qrService');
const logger = require('../middleware/logging');

async function generarEtiquetaPDF(req, res, next) {
  try {
    const { loteId, cantidad = 1 } = req.body;

    // Obtener datos lote
    const loteResult = await executeQuery(`
      SELECT * FROM Lotes WHERE Id = @id
    `, { id: { type: sql.Int, value: loteId } });

    if (loteResult.recordset.length === 0) {
      return res.status(404).json({ error: 'Lote no encontrado' });
    }

    const lote = loteResult.recordset;

    // Generar PDF
    const pdfPath = await generarEtiqueta(lote);

    // Generar QR
    const qrDataUrl = await generarQR({ codigo: lote.Codigo });

    // Agregar a cola impresión
    const colaResult = await executeQuery(`
      INSERT INTO ColaImpresion (LoteId, Codigo, Estado, Cantidad, FechaCreacion)
      OUTPUT INSERTED.Id
      VALUES (@loteId, @codigo, 'Pendiente', @cantidad, GETDATE())
    `, {
      loteId: { type: sql.Int, value: loteId },
      codigo: { type: sql.VarChar(50), value: lote.Codigo },
      cantidad: { type: sql.Int, value: cantidad }
    });

    logger.info(`✅ Etiqueta generada para ${lote.Codigo}`);

    res.status(201).json({
      mensaje: 'Etiqueta generada exitosamente',
      pdfPath,
      qrUrl: qrDataUrl,
      colaId: colaResult.recordset.Id
    });
  } catch (error) {
    next(error);
  }
}

async function obtenerColaImpresion(req, res, next) {
  try {
    const result = await executeQuery(`
      SELECT C.*, L.Codigo, L.Origen, L.TipoTueste
      FROM ColaImpresion C
      INNER JOIN Lotes L ON C.LoteId = L.Id
      WHERE C.Estado IN ('Pendiente', 'En Proceso')
      ORDER BY C.FechaCreacion DESC
    `);

    res.json({ cola: result.recordset });
  } catch (error) {
    next(error);
  }
}

module.exports = { generarEtiquetaPDF, obtenerColaImpresion };
