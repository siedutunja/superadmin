const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Colegio = sequelize.define("Colegio", {
    nombre: DataTypes.STRING,
    departamento: DataTypes.STRING,
    direccion: DataTypes.STRING,
    zona: DataTypes.STRING,
    tipo: DataTypes.STRING,
    telefono: DataTypes.STRING
});

module.exports = Colegio;
