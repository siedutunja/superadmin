// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const colegioRoutes = require('./routes/colegioRoutes');
const estudianteRoutes = require('./routes/estudianteRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/colegios', colegioRoutes);
require('./models');
app.use('/api/estudiantes', estudianteRoutes);

// Rutas
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend funcionando' });
});

// Sincronizar base de datos e iniciar servidor
sequelize.sync({ alter: true }).then(() => {
    console.log('✅ Base de datos sincronizada');

    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('❌ Error al sincronizar BD:', err);
});
