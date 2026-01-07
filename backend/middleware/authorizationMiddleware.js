function requireRole(rolesPermitidos) {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user.rolCodigo)) {
      return res.status(403).json({ error: 'Acceso denegado: rol insuficiente' });
    }
    next();
  };
}

module.exports = { requireRole };
