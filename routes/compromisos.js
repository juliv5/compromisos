const express = require('express');
const Compromiso = require('../models/Compromiso');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configurar el servicio de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tuemail@gmail.com',
    pass: 'tucontraseña'
  }
});

// Registrar un compromiso
router.post('/nuevo', async (req, res) => {
  try {
    const { nombreLider, descripcion, responsable, correoResponsable, municipio } = req.body;

    // Validar duplicados
    const existente = await Compromiso.findOne({ descripcion, responsable });
    if (existente) return res.status(400).json({ mensaje: 'El compromiso ya existe' });

    const nuevoCompromiso = new Compromiso({ nombreLider, descripcion, responsable, correoResponsable, municipio });
    await nuevoCompromiso.save();

    // Enviar notificación por correo
    await transporter.sendMail({
      from: 'tuemail@gmail.com',
      to: [correoResponsable, 'juanfelipegilmora2024@gmail.com'],
      subject: 'Nuevo Compromiso Registrado',
      text: `Hola ${responsable}, tienes un nuevo compromiso: ${descripcion}.`
    });

    res.status(201).json({ mensaje: 'Compromiso registrado' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Marcar como cumplido
router.put('/cumplido/:id', async (req, res) => {
  const { observaciones } = req.body;
  try {
    const compromiso = await Compromiso.findByIdAndUpdate(req.params.id, { estado: 'Cumplido', observaciones }, { new: true });

    // Enviar correo de notificación
    await transporter.sendMail({
      from: 'tuemail@gmail.com',
      to: [compromiso.correoResponsable, 'juanfelipegilmora2024@gmail.com'],
      subject: 'Compromiso Cumplido',
      text: `El compromiso "${compromiso.descripcion}" ha sido marcado como cumplido.`
    });

    res.json(compromiso);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Eliminar compromiso con contraseña
router.delete('/eliminar/:id', async (req, res) => {
  const { contraseña } = req.body;
  if (contraseña !== 'admin123') return res.status(403).json({ mensaje: 'Contraseña incorrecta' });

  try {
    await Compromiso.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Compromiso eliminado' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/', async (req, res) => {
  try {
    const compromisos = await Compromiso.find();
    res.json(compromisos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener compromisos' });
  }
});

module.exports = router;
