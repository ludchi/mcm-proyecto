const { executeQuery, sql } = require('../config/database');
const { registrarAuditoria } = require('../services/auditService');

async function obtenerAlertas(req, res, next) {
  try {
    const { tipo, prioridad } = req.query;

    let whereClause = 'WHERE Estado = \'Activa\'';
    const params = {};

    if (tipo) {
      whereClause += ' AND Tipo = @tipo';
      params.tipo = { type: sql.VarChar(50), value: tipo };
    }
    if (prioridad) {
      whereClause += ' AND Prioridad = @prioridad';
      params.prioridad = { type: sql.VarChar(50), value: prioridad };
    }

    const result = await executeQuery(`
      SELECT * FROM Alertas ${whereClause} ORDER BY Prioridad DESC, FechaCreacion DESC
    `, params);

    res.json({ alertas: result.recordset });
  } catch (error) {
    next(error);
  }
}

async function resolverAlerta(req, res, next) {
  try {
    const { id } = req.params;

    const result = await executeQuery(`
      UPDATE Alertas SET Estado = 'Resuelta', FechaResolucion = GETDATE()
      OUTPUT INSERTED.Id
      WHERE Id = @id
    `, { id: { type: sql.Int, value: id } });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Alerta no encontrada' });
    }

    await registrarAuditoria('Alertas', 'RESOLVER', id, req.user.id);
    res.json({ mensaje: 'Alerta resuelta correctamente' });
  } catch (error) {
    next(error);
  }
}

module.exports = { obtenerAlertas, resolverAlerta };
