const { executeQuery, sql } = require('../config/database');
const { registrarAuditoria } = require('../services/auditService');
const logger = require('../middleware/logging');

async function crearLote(req, res, next) {
  try {
    const { codigo, origen, tipoTueste, peso, fechaTueste, fechaCaducidad, notas } = req.body;
    const usuarioId = req.user.id;

    const result = await executeQuery(
      `INSERT INTO Lotes (Codigo, Origen, TipoTueste, PesoInicial, PesoActual, FechaTueste, FechaCaducidad, Estado, Notas, UsuarioCreadorId, FechaCreacion)
       OUTPUT INSERTED.Id, INSERTED.Codigo
       VALUES (@codigo, @origen, @tipoTueste, @peso, @peso, @fechaTueste, @fechaCaducidad, 'Activo', @notas, @usuarioId, GETDATE())`,
      {
        codigo: { type: sql.VarChar(50), value: codigo },
        origen: { type: sql.VarChar(100), value: origen },
        tipoTueste: { type: sql.VarChar(50), value: tipoTueste },
        peso: { type: sql.Decimal(10, 2), value: peso },
        fechaTueste: { type: sql.Date, value: fechaTueste },
        fechaCaducidad: { type: sql.Date, value: fechaCaducidad },
        notas: { type: sql.VarChar(500), value: notas },
        usuarioId: { type: sql.Int, value: usuarioId }
      }
    );

    const nuevoLote = result.recordset[0];
    await registrarAuditoria('Lotes', 'CREAR', nuevoLote.Id, usuarioId);
    logger.info(`✅ Lote creado: ${nuevoLote.Codigo}`);

    res.status(201).json({
      mensaje: 'Lote creado exitosamente',
      lote: nuevoLote
    });
  } catch (error) {
    logger.error('❌ Error creando lote:', error.message);
    next(error);
  }
}

async function listarLotes(req, res, next) {
  try {
    const { pagina = 1, origen, tipoTueste } = req.query;
    const offset = (pagina - 1) * 10;

    let whereClause = 'WHERE l.Estado != \'Eliminado\'';
    const params = { offset: { type: sql.Int, value: offset } };

    if (origen) {
      whereClause += ' AND l.Origen LIKE @origen';
      params.origen = { type: sql.VarChar(100), value: `%${origen}%` };
    }

    if (tipoTueste) {
      whereClause += ' AND l.TipoTueste = @tipoTueste';
      params.tipoTueste = { type: sql.VarChar(50), value: tipoTueste };
    }

    const result = await executeQuery(
      `SELECT l.*, u.Codigo AS UsuarioCreador FROM Lotes l
       INNER JOIN Usuarios u ON l.UsuarioCreadorId = u.Id
       ${whereClause}
       ORDER BY l.FechaCreacion DESC
       OFFSET @offset ROWS FETCH NEXT 10 ROWS ONLY`,
      params
    );

    res.json({
      lotes: result.recordset,
      pagina,
      itemsPorPagina: 10
    });
  } catch (error) {
    logger.error('❌ Error listando lotes:', error.message);
    next(error);
  }
}

async function actualizarLote(req, res, next) {
  try {
    const { id } = req.params;
    const { codigo, origen, tipoTueste, pesoActual, notas } = req.body;
    const usuarioId = req.user.id;

    const result = await executeQuery(
      `UPDATE Lotes SET Codigo = @codigo, Origen = @origen, TipoTueste = @tipoTueste, PesoActual = @pesoActual, Notas = @notas, FechaModificacion = GETDATE()
       OUTPUT INSERTED.Id, INSERTED.Codigo
       WHERE Id = @id AND Estado != 'Eliminado'`,
      {
        id: { type: sql.Int, value: id },
        codigo: { type: sql.VarChar(50), value: codigo },
        origen: { type: sql.VarChar(100), value: origen },
        tipoTueste: { type: sql.VarChar(50), value: tipoTueste },
        pesoActual: { type: sql.Decimal(10, 2), value: pesoActual },
        notas: { type: sql.VarChar(500), value: notas }
      }
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Lote no encontrado' });
    }

    await registrarAuditoria('Lotes', 'ACTUALIZAR', id, usuarioId);
    logger.info(`✅ Lote actualizado: ${id}`);

    res.json({
      mensaje: 'Lote actualizado',
      lote: result.recordset[0]
    });
  } catch (error) {
    logger.error('❌ Error actualizando lote:', error.message);
    next(error);
  }
}

async function eliminarLote(req, res, next) {
  try {
    const { id } = req.params;
    const usuarioId = req.user.id;

    const result = await executeQuery(
      `UPDATE Lotes SET Estado = 'Eliminado', FechaEliminacion = GETDATE()
       OUTPUT INSERTED.Codigo
       WHERE Id = @id`,
      { id: { type: sql.Int, value: id } }
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Lote no encontrado' });
    }

    await registrarAuditoria('Lotes', 'ELIMINAR', id, usuarioId);
    logger.info(`✅ Lote eliminado: ${id}`);

    res.json({ mensaje: 'Lote eliminado' });
  } catch (error) {
    logger.error('❌ Error eliminando lote:', error.message);
    next(error);
  }
}

module.exports = { crearLote, listarLotes, actualizarLote, eliminarLote };
