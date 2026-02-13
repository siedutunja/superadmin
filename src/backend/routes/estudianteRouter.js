const express = require('express');
const router = express.Router();
const { Estudiante, Colegio } = require('../models');

// Crear estudiante
router.post('/', async (req, res) => {
    const { nombre, apellido, edad, colegioId } = req.body;

    const estudiante = await Estudiante.create({
        nombre,
        apellido,
        edad,
        colegioId
    });

    res.status(201).json(estudiante);
});

// Listar estudiantes con su colegio
router.get('/', async (req, res) => {
    const estudiantes = await Estudiante.findAll({
        include: Colegio
    });

    res.json(estudiantes);
});

module.exports = router;
