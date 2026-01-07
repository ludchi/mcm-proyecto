const sql = require('mssql');

const config = {
    server: process.env.DB_SERVER || 'localhost',
    port: parseInt(process.env.DB_PORT) || 1433,
    database: process.env.DB_NAME || 'MexhiCoffeeManager',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

let pool;

async function getPool() {
    if (!pool || pool.connecting || pool.closed) {
        pool = new sql.ConnectionPool(config);
        await pool.connect();
        console.log('✅ SQL Server conectado');
    }
    return pool;
}

async function query(text, params = []) {
    const pool = await getPool();
    const ps = new sql.PreparedStatement(pool);
    params.forEach((param, i) => ps.input(`p${i}`, param));
    await ps.prepare(text);
    const result = await ps.execute();
    ps.unprepare();
    return result.recordset;
}

module.exports = { query, getPool };
