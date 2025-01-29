require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log(err));

app.listen(5000, () => console.log('Servidor corriendo en http://localhost:5000'));
const compromisoRoutes = require('./routes/compromisos');
app.use('/api/compromisos', compromisoRoutes);
