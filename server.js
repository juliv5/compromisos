require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Asegurar que dotenv se carga

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.log('❌ Error de conexión:', err));

// 💡 Usar el puerto que Render asigna dinámicamente
const PORT = process.env.PORT || 5000;

// Ruta de prueba para verificar que el servidor está activo
app.get('/', (req, res) => {
  res.send('✅ API funcionando correctamente');
});


// Importar rutas
const compromisoRoutes = require('./routes/compromisos');
app.use('/api/compromisos', compromisoRoutes);

// Iniciar el servidor en el puerto correcto
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
