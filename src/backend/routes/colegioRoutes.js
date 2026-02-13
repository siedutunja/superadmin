const express = require('express');
const router = express.Router();
const { Colegio } = require('../models');

// Obtener todos los colegios
router.get('/', async (req, res) => {
    const colegios = await Colegio.findAll();
    res.json(colegios);
});

module.exports = router;
