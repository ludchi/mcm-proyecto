// ✅ ARCHIVO: backend/services/emailService.js
// Servicio de envío de emails con Nodemailer

const nodemailer = require('nodemailer');
const logger = require('../middleware/logging');

// Configurar transporter (por ahora con valores de prueba)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'tu-email@gmail.com',
    pass: process.env.SMTP_PASSWORD || 'tu-contraseña-app'
  }
});

/**
 * Envía alerta de caducidad de lote
 * @param {string} email - Email del destinatario
 * @param {string} codigoLote - Código del lote
 * @param {string} fechaCaducidad - Fecha de caducidad
 */
async function enviarAlertaCaducidad(email, codigoLote, fechaCaducidad) {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@mexhicoffee.com',
      to: email,
      subject: `⚠️ Alerta: Lote ${codigoLote} próximo a caducar`,
      html: `
        <h2>Alerta de Caducidad</h2>
        <p>El lote <strong>${codigoLote}</strong> caduca el <strong>${fechaCaducidad}</strong></p>
        <p>Por favor, revisa el inventario y toma las acciones necesarias.</p>
        <hr>
        <p>Mexhi Coffee Manager</p>
      `
    };

    await transporter.sendMail(mailOptions);
    logger.info(`✅ Email de caducidad enviado a ${email} para lote ${codigoLote}`);
  } catch (error) {
    logger.error('❌ Error enviando email de caducidad:', error.message);
  }
}

/**
 * Envía alerta de stock bajo
 * @param {string} email - Email del destinatario
 * @param {string} producto - Nombre del producto
 * @param {number} stock - Stock actual
 */
async function enviarAlertaStockBajo(email, producto, stock) {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@mexhicoffee.com',
      to: email,
      subject: `⚠️ Alerta: Stock bajo en ${producto}`,
      html: `
        <h2>Alerta de Stock Bajo</h2>
        <p>El producto <strong>${producto}</strong> tiene stock bajo: <strong>${stock} unidades</strong></p>
        <p>Por favor, realiza un pedido de reabastecimiento.</p>
        <hr>
        <p>Mexhi Coffee Manager</p>
      `
    };

    await transporter.sendMail(mailOptions);
    logger.info(`✅ Email de stock bajo enviado a ${email} para producto ${producto}`);
  } catch (error) {
    logger.error('❌ Error enviando email de stock bajo:', error.message);
  }
}

/**
 * Envía alerta interna
 * @param {string} asunto - Asunto del email
 * @param {string} contenido - Contenido HTML
 */
async function enviarAlertaInterna(asunto, contenido) {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER || 'noreply@mexhicoffee.com',
      to: process.env.SMTP_USER || 'tu-email@gmail.com',
      subject: `🔔 ${asunto}`,
      html: contenido
    };

    await transporter.sendMail(mailOptions);
    logger.info(`✅ Alerta interna enviada: ${asunto}`);
  } catch (error) {
    logger.error('❌ Error enviando alerta interna:', error.message);
  }
}

module.exports = {
  enviarAlertaCaducidad,
  enviarAlertaStockBajo,
  enviarAlertaInterna
};