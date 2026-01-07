// ✅ ARCHIVO: backend/services/pdfService.js
// Servicio de generación de etiquetas PDF para café

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const logger = require('../middleware/logging');

/**
 * Genera una etiqueta PDF A6 para un lote de café
 * @param {object} lote - Datos del lote {codigo, origen, tipoTueste, peso, fechaTueste}
 * @param {string} qrDataUrl - Data URL del código QR
 * @returns {Promise<string>} - Ruta del archivo PDF generado
 */
async function generarEtiquetaPDF(lote, qrDataUrl) {
  try {
    // Crear directorio si no existe
    if (!fs.existsSync('temp')) {
      fs.mkdirSync('temp');
    }

    // A6 landscape: 148mm x 105mm (554 x 391 puntos)
    const doc = new PDFDocument({
      size: [554, 391],
      margin: 10
    });

    const filename = `temp/etiqueta_${lote.codigo}_${Date.now()}.pdf`;
    const writeStream = fs.createWriteStream(filename);

    doc.pipe(writeStream);

    // Paleta de colores Mexhi
    const colorCafeOscuro = '#4B3621';
    const colorMarron = '#8B5E3C';
    const colorBeige = '#F5F0E1';

    // Encabezado con nombre de cafetería
    doc.fillColor(colorCafeOscuro)
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('MEXHI COFFEE', 20, 15);

    // Línea separadora
    doc.strokeColor(colorMarron)
      .lineWidth(2)
      .moveTo(20, 40)
      .lineTo(534, 40)
      .stroke();

    // Código del lote
    doc.fillColor(colorCafeOscuro)
      .fontSize(11)
      .font('Helvetica-Bold')
      .text('CÓDIGO:', 20, 50);

    doc.fillColor(colorMarron)
      .fontSize(10)
      .font('Helvetica')
      .text(lote.codigo, 80, 50);

    // Origen
    doc.fillColor(colorCafeOscuro)
      .fontSize(11)
      .font('Helvetica-Bold')
      .text('ORIGEN:', 20, 75);

    doc.fillColor(colorMarron)
      .fontSize(10)
      .font('Helvetica')
      .text(lote.origen, 80, 75);

    // Tipo de tueste
    doc.fillColor(colorCafeOscuro)
      .fontSize(11)
      .font('Helvetica-Bold')
      .text('TUESTE:', 20, 100);

    doc.fillColor(colorMarron)
      .fontSize(10)
      .font('Helvetica')
      .text(lote.tipoTueste, 80, 100);

    // Peso
    doc.fillColor(colorCafeOscuro)
      .fontSize(11)
      .font('Helvetica-Bold')
      .text('PESO:', 20, 125);

    doc.fillColor(colorMarron)
      .fontSize(10)
      .font('Helvetica')
      .text(`${lote.peso}g`, 80, 125);

    // Fecha de tueste
    doc.fillColor(colorCafeOscuro)
      .fontSize(11)
      .font('Helvetica-Bold')
      .text('TUESTE:', 20, 150);

    doc.fillColor(colorMarron)
      .fontSize(10)
      .font('Helvetica')
      .text(lote.fechaTueste, 80, 150);

    // Línea separadora
    doc.strokeColor(colorMarron)
      .lineWidth(1)
      .moveTo(20, 170)
      .lineTo(534, 170)
      .stroke();

    // QR (si se proporciona)
    if (qrDataUrl) {
      doc.image(qrDataUrl, 20, 185, { width: 80, height: 80 });
    }

    // Footer con branding
    doc.fillColor(colorCafeOscuro)
      .fontSize(8)
      .font('Helvetica')
      .text('www.mexhicoffee.com', 20, 350);

    doc.end();

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        logger.info(`✅ PDF generado: ${filename}`);
        resolve(filename);
      });

      writeStream.on('error', (err) => {
        logger.error('❌ Error generando PDF:', err.message);
        reject(err);
      });
    });
  } catch (error) {
    logger.error('❌ Error en generarEtiquetaPDF:', error.message);
    throw error;
  }
}

module.exports = {
  generarEtiquetaPDF
};