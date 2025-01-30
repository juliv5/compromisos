require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB Atlas
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.log('❌ Error de conexión:', err));


// Definir un puerto seguro usando la variable de entorno de Render
const PORT = process.env.PORT || 5000;

// Ruta de prueba para verificar que el servidor está activo
app.get('/', (req, res) => {
  res.send('✅ API funcionando correctamente en el puerto ' + PORT);
});

// Importar rutas
const compromisoRoutes = require('./routes/compromisos');
app.use('/api/compromisos', compromisoRoutes);

// Iniciar el servidor en el puerto correcto
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
