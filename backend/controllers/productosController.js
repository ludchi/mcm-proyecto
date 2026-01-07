const { executeQuery, sql } = require('../config/database');
const { registrarAuditoria } = require('../services/auditService');
const logger = require('../middleware/logging');

async function crearProducto(req, res, next) {
  try {
    const { nombre, origen, presentacion, stockMinimo, tipoTueste, descripcion } = req.body;

    const result = await executeQuery(`
      INSERT INTO Productos (Nombre, Origen, Presentacion, StockMinimo, StockActual, TipoTueste, Descripcion, FechaCreacion)
      OUTPUT INSERTED.Id, INSERTED.Nombre
      VALUES (@nombre, @origen, @presentacion, @stockMinimo, 0, @tipoTueste, @descripcion, GETDATE())
    `, {
      nombre: { type: sql.VarChar(100), value: nombre },
      origen: { type: sql.VarChar(100), value: origen },
      presentacion: { type: sql.VarChar(50), value: presentacion },
      stockMinimo: { type: sql.Int, value: stockMinimo },
      tipoTueste: { type: sql.VarChar(50), value: tipoTueste },
      descripcion: { type: sql.VarChar(500), value: descripcion || '' }
    });

    const nuevoProducto = result.recordset;
    await registrarAuditoria('Productos', 'CREAR', nuevoProducto.Id, req.user.id);

    logger.info(`✅ Producto creado: ${nuevoProducto.Nombre}`);

    res.status(201).json({
      mensaje: 'Producto creado exitosamente',
      producto: nuevoProducto
    });
  } catch (error) {
    next(error);
  }
}

async function listarProductos(req, res, next) {
  try {
    const { origen, tipoTueste, search } = req.query;

    let whereClause = 'WHERE 1=1';
    const params = {};

    if (origen) {
      whereClause += ' AND Origen LIKE @origen';
      params.origen = { type: sql.VarChar(100), value: `%${origen}%` };
    }
    if (tipoTueste) {
      whereClause += ' AND TipoTueste = @tipoTueste';
      params.tipoTueste = { type: sql.VarChar(50), value: tipoTueste };
    }
    if (search) {
      whereClause += ' AND (Nombre LIKE @search OR Origen LIKE @search)';
      params.search = { type: sql.VarChar(100), value: `%${search}%` };
    }

    const result = await executeQuery(`
      SELECT * FROM Productos ${whereClause} ORDER BY Nombre ASC
    `, params);

    res.json({ productos: result.recordset });
  } catch (error) {
    next(error);
  }
}

async function actualizarProducto(req, res, next) {
  try {
    const { id } = req.params;
    const { nombre, stockMinimo, descripcion } = req.body;

    const result = await executeQuery(`
      UPDATE Productos 
      SET Nombre = @nombre, StockMinimo = @stockMinimo, Descripcion = @descripcion
      OUTPUT INSERTED.Id
      WHERE Id = @id
    `, {
      id: { type: sql.Int, value: id },
      nombre: { type: sql.VarChar(100), value: nombre },
      stockMinimo: { type: sql.Int, value: stockMinimo },
      descripcion: { type: sql.VarChar(500), value: descripcion }
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await registrarAuditoria('Productos', 'ACTUALIZAR', id, req.user.id);
    res.json({ mensaje: 'Producto actualizado correctamente' });
  } catch (error) {
    next(error);
  }
}

async function eliminarProducto(req, res, next) {
  try {
    const { id } = req.params;

    // Verificar que no tenga lotes activos
    const lotesActivos = await executeQuery(`
      SELECT COUNT(*) as cantidad FROM Lotes 
      WHERE ProductoId = @id AND Estado != 'Eliminado'
    `, { id: { type: sql.Int, value: id } });

    if (lotesActivos.recordset.cantidad > 0) {
      return res.status(400).json({ 
        error: 'No se puede eliminar producto con lotes activos' 
      });
    }

    const result = await executeQuery(`
      DELETE FROM Productos WHERE Id = @id
    `, { id: { type: sql.Int, value: id } });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await registrarAuditoria('Productos', 'ELIMINAR', id, req.user.id);
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
}

module.exports = { crearProducto, listarProductos, actualizarProducto, eliminarProducto };
