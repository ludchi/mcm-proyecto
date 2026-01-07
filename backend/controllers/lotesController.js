const { executeQuery, executeTransaction, sql } = require('../config/database');
const { registrarAuditoria } = require('../services/auditService');
const { enviarAlertaInterna } = require('../services/emailService');
const logger = require('../middleware/logging');

async function crearLote(req, res, next) {
  try {
    const { codigo, origen, tipoTueste, peso, fechaTueste, fechaCaducidad, notas } = req.body;

    const operations = [
      {
        query: `
          INSERT INTO Lotes (Codigo, Origen, TipoTueste, PesoInicial, PesoActual, FechaTueste, FechaCaducidad, Estado, Notas, UsuarioCreadorId, FechaCreacion)
          OUTPUT INSERTED.Id, INSERTED.Codigo
          VALUES (@codigo, @origen, @tipoTueste, @peso, @peso, @fechaTueste, @fechaCaducidad, 'Activo', @notas, @usuarioId, GETDATE())
        `,
        params: {
          codigo: { type: sql.VarChar(50), value: codigo },
          origen: { type: sql.VarChar(100), value: origen },
          tipoTueste: { type: sql.VarChar(50), value: tipoTueste },
          peso: { type: sql.Decimal(10, 2), value: peso },
          fechaTueste: { type: sql.Date, value: fechaTueste },
          fechaCaducidad: { type: sql.Date, value: fechaCaducidad },
          notas: { type: sql.VarChar(500), value: notas || '' },
          usuarioId: { type: sql.Int, value: req.user.id }
        }
      }
    ];

    const results = await executeTransaction(operations);
    const nuevoLote = results.recordset;

    await registrarAuditoria('Lotes', 'CREAR', nuevoLote.Id, req.user.id, 
      `Creado lote ${nuevoLote.Codigo}`);

    logger.info(`✅ Lote creado: ${nuevoLote.Codigo}`);

    res.status(201).json({
      mensaje: 'Lote creado exitosamente',
      lote: nuevoLote
    });
  } catch (error) {
    next(error);
  }
}

async function listarLotes(req, res, next) {
  try {
    const { pagina = 1, origen, tipoTueste, estado, search } = req.query;
    const offset = (pagina - 1) * 10;

    let whereClause = 'WHERE L.Estado != \'Eliminado\'';
    const params = { offset: { type: sql.Int, value: offset } };

    if (origen) {
      whereClause += ' AND L.Origen LIKE @origen';
      params.origen = { type: sql.VarChar(100), value: `%${origen}%` };
    }
    if (tipoTueste) {
      whereClause += ' AND L.TipoTueste = @tipoTueste';
      params.tipoTueste = { type: sql.VarChar(50), value: tipoTueste };
    }
    if (estado) {
      whereClause += ' AND L.Estado = @estado';
      params.estado = { type: sql.VarChar(50), value: estado };
    }
    if (search) {
      whereClause += ' AND (L.Codigo LIKE @search OR L.Origen LIKE @search)';
      params.search = { type: sql.VarChar(100), value: `%${search}%` };
    }

    const query = `
      SELECT L.*, U.Codigo AS UsuarioCreador,
             DATEDIFF(DAY, GETDATE(), L.FechaCaducidad) AS DiasParaCaducar
      FROM Lotes L
      INNER JOIN Usuarios U ON L.UsuarioCreadorId = U.Id
      ${whereClause}
      ORDER BY L.FechaCreacion DESC
      OFFSET @offset ROWS FETCH NEXT 10 ROWS ONLY;

      SELECT COUNT(*) as Total FROM Lotes L ${whereClause};
    `;

    const result = await executeQuery(query, params);

    res.json({
      lotes: result.recordsets,
      total: result.recordsets.Total,
      pagina,
      paginacion: {
        pagina,
        itemsPorPagina: 10,
        totalPaginas: Math.ceil(result.recordsets.Total / 10)
      }
    });
  } catch (error) {
    next(error);
  }
}

async function actualizarLote(req, res, next) {
  try {
    const { id } = req.params;
    const { codigo, origen, tipoTueste, pesoActual, notas } = req.body;

    const result = await executeQuery(`
      UPDATE Lotes 
      SET Codigo = @codigo, Origen = @origen, TipoTueste = @tipoTueste,
          PesoActual = @pesoActual, Notas = @notas, FechaModificacion = GETDATE(), 
          UsuarioModificadorId = @usuarioId
      OUTPUT INSERTED.Id, INSERTED.Codigo
      WHERE Id = @id AND Estado != 'Eliminado'
    `, {
      id: { type: sql.Int, value: id },
      codigo: { type: sql.VarChar(50), value: codigo },
      origen: { type: sql.VarChar(100), value: origen },
      tipoTueste: { type: sql.VarChar(50), value: tipoTueste },
      pesoActual: { type: sql.Decimal(10, 2), value: pesoActual },
      notas: { type: sql.VarChar(500), value: notas },
      usuarioId: { type: sql.Int, value: req.user.id }
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Lote no encontrado' });
    }

    await registrarAuditoria('Lotes', 'ACTUALIZAR', id, req.user.id);

    logger.info(`✅ Lote actualizado: ${result.recordset.Codigo}`);

    res.json({
      mensaje: 'Lote actualizado correctamente',
      lote: result.recordset
    });
  } catch (error) {
    next(error);
  }
}

async function eliminarLote(req, res, next) {
  try {
    const { id } = req.params;

    const result = await executeQuery(`
      UPDATE Lotes SET Estado = 'Eliminado', FechaEliminacion = GETDATE()
      OUTPUT INSERTED.Codigo
      WHERE Id = @id
    `, { id: { type: sql.Int, value: id } });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Lote no encontrado' });
    }

    await registrarAuditoria('Lotes', 'ELIMINAR', id, req.user.id);

    res.json({ mensaje: 'Lote eliminado correctamente' });
  } catch (error) {
    next(error);
  }
}

module.exports = { crearLote, listarLotes, actualizarLote, eliminarLote };
