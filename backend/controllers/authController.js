const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

exports.login = async (req, res) => {
    try {
        const { codigo, contrasena } = req.body;
        
        if (!codigo || !contrasena) {
            return res.status(400).json({ error: 'Código y contraseña requeridos' });
        }

        const request = global.dbPool.request();
        request.input('codigo', sql.NVarChar(50), codigo);
        
        const usuario = await request.query(`
            SELECT u.Id, u.Codigo, u.Nombre, u.Email, u.ContrasenaHash, 
                   u.Estado, r.Codigo as RolCodigo, r.Nombre as RolNombre
            FROM Usuarios u 
            INNER JOIN Roles r ON u.RolId = r.Id 
            WHERE u.Codigo = @codigo AND u.Estado = 'Activo'
        `);

        if (usuario.recordset.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const user = usuario.recordset[0];
        const passwordMatch = await bcrypt.compare(contrasena, user.ContrasenaHash);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar JWT
        const token = jwt.sign(
            { 
                id: user.Id, 
                codigo: user.Codigo, 
                rol: user.RolCodigo,
                nombre: user.Nombre 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Registrar acceso en auditoría
        const auditRequest = global.dbPool.request();
        auditRequest.input('usuarioId', sql.Int, user.Id);
        await auditRequest.query(`
            INSERT INTO Auditoria (Tabla, Accion, UsuarioId, Cambios)
            VALUES ('Sistema', 'LOGIN', @usuarioId, 'Sesión iniciada')
        `);

        res.json({
            success: true,
            token,
            usuario: {
                id: user.Id,
                codigo: user.Codigo,
                nombre: user.Nombre,
                email: user.Email,
                rol: user.RolCodigo,
                rolNombre: user.RolNombre
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.perfil = async (req, res) => {
    try {
        res.json({
            usuario: req.usuario,
            permisos: [] // Futuro: cargar desde tbl_permisos_por_rol
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
