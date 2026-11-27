const db = require("../config/db");

const enTransaccion = async (trabajo) => {
    const conexion = await db.getConnection();
    try {
        await conexion.beginTransaction();
        const resultado = await trabajo(conexion);
        await conexion.commit();
        return resultado;
    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
};

module.exports = { enTransaccion }; // enTransaccion: ejecuta un trabajo y, si algo falla, deshace todo (rollback).