const JWT_SECRET = process.env.JWT_SECRET || 'mexhi-coffee-manager-2025-secret-key';
const JWT_EXPIRE = '24h';
const JWT_REFRESH_EXPIRE = '7d';

module.exports = { JWT_SECRET, JWT_EXPIRE, JWT_REFRESH_EXPIRE };
