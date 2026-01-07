require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();


// Middleware
app.use(cors({
    origin: ['http://localhost:8000', 'http://localhost:3000']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


// Health check
app.get('/health', (req, res) => {
    res.json({
        status: '✅ MCM Backend v1.0 - Express OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});


// API Prefix - Tu frontend lo espera
app.use('/api/v1', (req, res) => {
    res.json({ message: '🛠️ API v1 - Endpoints en desarrollo' });
});


// 404 Handler CORRECTO (NO usar *)
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint no encontrado',
        path: req.originalUrl
    });
});


// Error Handler
app.use((err, req, res, next) => {
    console.error('❌ Error servidor:', err);
    res.status(500).json({
        error: 'Error interno del servidor',
        message: err.message
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔════════════════════════════════════════════╗
║   🍵 MEXHI COFFEE MANAGER v1.0            ║
╚════════════════════════════════════════════╝


✅ Servidor: http://localhost:${PORT}
📡 API v1: http://localhost:${PORT}/api/v1
🏥 Health: http://localhost:${PORT}/health


🔧 Ctrl+C para detener | rs para reiniciar (nodemon)
📅 ${new Date().toLocaleString('es-MX')}
    `);
});