// ✅ ARCHIVO: backend/services/qrService.js
// Servicio de generación de códigos QR

const QRCode = require('qrcode');
const logger = require('../middleware/logging');

/**
 * Genera un código QR en formato Data URL
 * @param {string} data - Datos a codificar en el QR
 * @param {string} loteId - ID del lote (para contexto)
 * @returns {Promise<string>} - Data URL del QR
 */
async function generarQR(data, loteId = null) {
  try {
    // Crear URL del QR que apunta a la página del lote
    const urlQR = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/lote/${loteId}`;

    const qrDataUrl = await QRCode.toDataURL(urlQR, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      width: 300,
      color: {
        dark: '#4B3621', // Café oscuro (Mexhi)
        light: '#F5F0E1' // Beige (Mexhi)
      }
    });

    logger.info(`✅ QR generado para lote ${loteId}`);
    return qrDataUrl;
  } catch (error) {
    logger.error('❌ Error generando QR:', error.message);
    throw error;
  }
}

/**
 * Genera un código QR en archivo PNG
 * @param {string} data - Datos a codificar
 * @param {string} filepath - Ruta donde guardar la imagen
 */
async function generarQRArchivo(data, filepath) {
  try {
    await QRCode.toFile(filepath, data, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      width: 300,
      color: {
        dark: '#4B3621',
        light: '#F5F0E1'
      }
    });

    logger.info(`✅ QR guardado en ${filepath}`);
  } catch (error) {
    logger.error('❌ Error guardando QR en archivo:', error.message);
    throw error;
  }
}

module.exports = {
  generarQR,
  generarQRArchivo
};