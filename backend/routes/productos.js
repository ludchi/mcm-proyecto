const { executeQuery, sql } = require('../config/database');
const { registrarAuditoria } = require('../services/auditService');
const logger = require('../middleware/logging');

async function crearProducto(req, res, next) {
  try {
    const { nombre, origen, presentacion, stockMinimo, tipoTueste, descripcion } = req.body;

    const result = await executeQuery(
      `INSERT INTO Productos (Nombre, Origen, Presentacion, StockMinimo, StockActual, TipoTueste, Descripcion, FechaCreacion)
       OUTPUT INSERTED.Id, INSERTED.Nombre
       VALUES (@nombre, @origen, @presentacion, @stockMinimo, 0, @tipoTueste, @descripcion, GETDATE())`,
      {
        nombre: { type: sql.VarChar(100), value: nombre },
        origen: { type: sql.VarChar(100), value: origen },
        presentacion: { type: sql.VarChar(50), value: presentacion },
        stockMinimo: { type: sql.Int, value: stockMinimo },
        tipoTueste: { type: sql.VarChar(50), value: tipoTueste },
        descripcion: { type: sql.VarChar(500), value: descripcion }
      }
    );

    const nuevoProducto = result.recordset[0];
    await registrarAuditoria('Productos', 'CREAR', nuevoProducto.Id, req.user.id);
    logger.info(`✅ Producto creado: ${nuevoProducto.Nombre}`);

    res.status(201).json({
      mensaje: 'Producto creado',
      producto: nuevoProducto
    });
  } catch (error) {
    logger.error('❌ Error creando producto:', error.message);
    next(error);
  }
}

async function listarProductos(req, res, next) {
  try {
    const result = await executeQuery(
      `SELECT * FROM Productos WHERE Estado != 'Eliminado' ORDER BY Nombre ASC`,
      {}
    );

    res.json({ productos: result.recordset });
  } catch (error) {
    logger.error('❌ Error listando productos:', error.message);
    next(error);
  }
}

async function actualizarProducto(req, res, next) {
  try {
    const { id } = req.params;
    const { nombre, stockMinimo, descripcion } = req.body;

    const result = await executeQuery(
      `UPDATE Productos SET Nombre = @nombre, StockMinimo = @stockMinimo, Descripcion = @descripcion
       OUTPUT INSERTED.Id, INSERTED.Nombre
       WHERE Id = @id`,
      {
        id: { type: sql.Int, value: id },
        nombre: { type: sql.VarChar(100), value: nombre },
        stockMinimo: { type: sql.Int, value: stockMinimo },
        descripcion: { type: sql.VarChar(500), value: descripcion }
      }
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await registrarAuditoria('Productos', 'ACTUALIZAR', id, req.user.id);
    res.json({ mensaje: 'Producto actualizado', producto: result.recordset[0] });
  } catch (error) {
    logger.error('❌ Error actualizando producto:', error.message);
    next(error);
  }
}

async function eliminarProducto(req, res, next) {
  try {
    const { id } = req.params;

    const result = await executeQuery(
      `UPDATE Productos SET Estado = 'Eliminado' WHERE Id = @id`,
      { id: { type: sql.Int, value: id } }
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await registrarAuditoria('Productos', 'ELIMINAR', id, req.user.id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    logger.error('❌ Error eliminando producto:', error.message);
    next(error);
  }
}

module.exports = { crearProducto, listarProductos, actualizarProducto, eliminarProducto };
