// ✅ Archivo: backend/test-db-connection.js
// Ejecución: node test-db-connection.js
// Propósito: Verificar conexión a SQL Server

require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  server: process.env.DBSERVER,
  database: process.env.DBNAME,
  port: parseInt(process.env.DBPORT),
  options: {
    encrypt: true,
    trustServerCertificate: true,
    connectionTimeout: 5000
  }
};

console.log('\n🔗 INTENTANDO CONECTAR A SQL SERVER\n');
console.log('Configuración:');
console.log(`  Servidor: ${config.server}:${config.port}`);
console.log(`  Base de datos: ${config.database}`);
console.log(`  Usuario: ${config.user}\n`);

async function testConnection() {
  try {
    const pool = new sql.ConnectionPool(config);
    await pool.connect();
    
    console.log('✅ CONEXIÓN EXITOSA\n');
    
    // Prueba de query
    const result = await pool.request().query('SELECT GETDATE() as FechaActual');
    console.log('✅ Query de prueba exitosa');
    console.log(`   Fecha actual en BD: ${result.recordset[0].FechaActual}\n`);
    
    await pool.close();
    process.exit(0);
  } catch (error) {
    console.log('❌ ERROR DE CONEXIÓN:\n');
    console.log(`Error: ${error.message}\n`);
    
    // Diagnóstico específico
    if (error.message.includes('login')) {
      console.log('💡 POSIBLE CAUSA: Credenciales incorrectas');
      console.log('   → Verifica DBUSER y DBPASSWORD en .env');
    } else if (error.message.includes('timeout') || error.message.includes('ECONNREFUSED')) {
      console.log('💡 POSIBLE CAUSA: SQL Server no está corriendo');
      console.log('   → Inicia SQL Server en Windows Services');
      console.log('   → O verifica el nombre del servidor: ' + config.server);
    } else if (error.message.includes('database')) {
      console.log('💡 POSIBLE CAUSA: Base de datos no existe');
      console.log('   → Crea la BD: ' + config.database);
    }
    
    console.log('\n📋 Stack completo:');
    console.log(error.stack);
    process.exit(1);
  }
}

testConnection();