const { executeQuery, sql } = require('../config/database');
const bcrypt = require('bcrypt');
const logger = require('../middleware/logging');

async function crearUsuario(req, res, next) {
  try {
    const { codigo, email, password, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await executeQuery(
      `INSERT INTO Usuarios (Codigo, Email, Password, Rol, FechaCreacion)
       OUTPUT INSERTED.Id, INSERTED.Codigo, INSERTED.Email
       VALUES (@codigo, @email, @password, @rol, GETDATE())`,
      {
        codigo: { type: sql.VarChar(50), value: codigo },
        email: { type: sql.VarChar(100), value: email },
        password: { type: sql.VarChar(255), value: hashedPassword },
        rol: { type: sql.VarChar(50), value: rol }
      }
    );

    logger.info(`✅ Usuario creado: ${result.recordset[0].Codigo}`);
    res.status(201).json({ mensaje: 'Usuario creado', usuario: result.recordset[0] });
  } catch (error) {
    logger.error('❌ Error creando usuario:', error.message);
    next(error);
  }
}

async function listarUsuarios(req, res, next) {
  try {
    const result = await executeQuery(
      `SELECT Id, Codigo, Email, Rol, FechaCreacion FROM Usuarios ORDER BY Codigo ASC`,
      {}
    );
    res.json({ usuarios: result.recordset });
  } catch (error) {
    logger.error('❌ Error listando usuarios:', error.message);
    next(error);
  }
}

module.exports = { crearUsuario, listarUsuarios };
