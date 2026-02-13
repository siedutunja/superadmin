const Colegio = require('./Colegio');
const Estudiante = require('./Estudiante');

// Relaciones
Colegio.hasMany(Estudiante, {
    foreignKey: 'colegioId',
    onDelete: 'CASCADE'
});

Estudiante.belongsTo(Colegio, {
    foreignKey: 'colegioId'
});

module.exports = {
    Colegio,
    Estudiante
};
