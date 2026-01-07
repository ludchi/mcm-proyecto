const bcrypt = require('bcryptjs');
const { executeQuery, sql } = require('../config/database');
const { registrarAuditoria } = require('../services/auditService');
const logger = require('../middleware/logging');

async function crearUsuario(req, res, next) {
  try {
    const { codigo, nombre, email, contrasena, rolId } = req.body;

    // Hash contraseña
    const hash = await bcrypt.hash(contrasena, 12);

    const result = await executeQuery(`
      INSERT INTO Usuarios (Codigo, Nombre, Email, ContrasenaHash, RolId, Estado, FechaCreacion)
      OUTPUT INSERTED.Id, INSERTED.Codigo
      VALUES (@codigo, @nombre, @email, @hash, @rolId, 'Activo', GETDATE())
    `, {
      codigo: { type: sql.VarChar(50), value: codigo },
      nombre: { type: sql.VarChar(100), value: nombre },
      email: { type: sql.VarChar(100), value: email },
      hash: { type: sql.VarChar(255), value: hash },
      rolId: { type: sql.Int, value: rolId }
    });

    const nuevoUsuario = result.recordset;
    await registrarAuditoria('Usuarios', 'CREAR', nuevoUsuario.Id, req.user.id);

    logger.info(`✅ Usuario creado: ${nuevoUsuario.Codigo}`);

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      usuario: { id: nuevoUsuario.Id, codigo: nuevoUsuario.Codigo }
    });
  } catch (error) {
    next(error);
  }
}

async function listarUsuarios(req, res, next) {
  try {
    const { pagina = 1, estado } = req.query;
    const offset = (pagina - 1) * 10;

    let whereClause = 'WHERE 1=1';
    const params = { offset: { type: sql.Int, value: offset } };

    if (estado) {
      whereClause += ' AND U.Estado = @estado';
      params.estado = { type: sql.VarChar(50), value: estado };
    }

    const result = await executeQuery(`
      SELECT U.*, R.Nombre AS RolNombre
      FROM Usuarios U
      LEFT JOIN Roles R ON U.RolId = R.Id
      ${whereClause}
      ORDER BY U.FechaCreacion DESC
      OFFSET @offset ROWS FETCH NEXT 10 ROWS ONLY;

      SELECT COUNT(*) as Total FROM Usuarios U ${whereClause};
    `, params);

    res.json({
      usuarios: result.recordsets,
      total: result.recordsets.Total,
      pagina
    });
  } catch (error) {
    next(error);
  }
}

async function actualizarUsuario(req, res, next) {
  try {
    const { id } = req.params;
    const { nombre, email, rolId } = req.body;

    const result = await executeQuery(`
      UPDATE Usuarios 
      SET Nombre = @nombre, Email = @email, RolId = @rolId, FechaModificacion = GETDATE()
      OUTPUT INSERTED.Id
      WHERE Id = @id
    `, {
      id: { type: sql.Int, value: id },
      nombre: { type: sql.VarChar(100), value: nombre },
      email: { type: sql.VarChar(100), value: email },
      rolId: { type: sql.Int, value: rolId }
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await registrarAuditoria('Usuarios', 'ACTUALIZAR', id, req.user.id);
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    next(error);
  }
}

async function eliminarUsuario(req, res, next) {
  try {
    const { id } = req.params;

    const result = await executeQuery(`
      UPDATE Usuarios SET Estado = 'Inactivo', FechaEliminacion = GETDATE()
      WHERE Id = @id
    `, { id: { type: sql.Int, value: id } });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await registrarAuditoria('Usuarios', 'ELIMINAR', id, req.user.id);
    res.json({ mensaje: 'Usuario desactivado correctamente' });
  } catch (error) {
    next(error);
  }
}

async function asignarRol(req, res, next) {
  try {
    const { id } = req.params;
    const { rolId } = req.body;

    const result = await executeQuery(`
      UPDATE Usuarios SET RolId = @rolId WHERE Id = @id
    `, { id: { type: sql.Int, value: id }, rolId: { type: sql.Int, value: rolId } });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await registrarAuditoria('Usuarios', 'ROL_ASIGNADO', id, req.user.id);
    res.json({ mensaje: 'Rol asignado correctamente' });
  } catch (error) {
    next(error);
  }
}

module.exports = { crearUsuario, listarUsuarios, actualizarUsuario, eliminarUsuario, asignarRol };
