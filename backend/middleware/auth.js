const jwt = require('jsonwebtoken');

const verificarJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token requerido' });
    }

    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.usuario = decoded;
        next();
    });
};

module.exports = { verificarJWT };


function verificarAlmacenista(req, res, next) {
  const rolesPermitidos = ['almacenista', 'admin'];
  if (!rolesPermitidos.includes(req.user.rol)) {
    return res.status(403).json({
      error: 'Acceso denegado',
      code: 'UNAUTHORIZED_ROLE'
    });
  }
  next();
}

function verificarBarista(req, res, next) {
  const rolesPermitidos = ['barista', 'almacenista', 'admin'];
  if (!rolesPermitidos.includes(req.user.rol)) {
    return res.status(403).json({
      error: 'Acceso denegado',
      code: 'UNAUTHORIZED_ROLE'
    });
  }
  next();
}

module.exports = {
  verificarToken,
  verificarAdmin,
  verificarAlmacenista,
  verificarBarista
};
