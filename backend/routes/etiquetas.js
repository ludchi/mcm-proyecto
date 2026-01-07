const { executeQuery, sql } = require('../config/database');
const { generarQR } = require('../services/qrService');
const { generarEtiquetaPDF } = require('../services/pdfService');
const logger = require('../middleware/logging');

async function generarEtiquetaPDF(req, res, next) {
  try {
    const { loteId } = req.body;

    const loteResult = await executeQuery(
      `SELECT * FROM Lotes WHERE Id = @id`,
      { id: { type: sql.Int, value: loteId } }
    );

    if (loteResult.recordset.length === 0) {
      return res.status(404).json({ error: 'Lote no encontrado' });
    }

    const lote = loteResult.recordset[0];
    const qrDataUrl = await generarQR(lote.Codigo, loteId);
    const pdfPath = await generarEtiquetaPDF(lote, qrDataUrl);

    logger.info(`✅ Etiqueta generada para lote ${lote.Codigo}`);
    res.status(201).json({ mensaje: 'Etiqueta generada', pdfPath, qrUrl: qrDataUrl });
  } catch (error) {
    logger.error('❌ Error generando etiqueta:', error.message);
    next(error);
  }
}

async function obtenerColaImpresion(req, res, next) {
  try {
    const result = await executeQuery(
      `SELECT * FROM ColaImpresion WHERE Estado = 'Pendiente' ORDER BY FechaCreacion DESC`,
      {}
    );
    res.json({ cola: result.recordset });
  } catch (error) {
    logger.error('❌ Error obteniendo cola:', error.message);
    next(error);
  }
}

module.exports = { generarEtiquetaPDF, obtenerColaImpresion };
