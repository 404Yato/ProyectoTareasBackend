const db = require("../config/db/config")

const { fnObtenerTareas, fnCrearTarea } = require("../config/storedFunction/call/tarea");
const { deleteTarea: fnEliminarTarea } = require('../config/storedFunction/call/tarea/eliminar_tarea')
const { Tarea } = require("../model/tareaModel");
const { sendOk, internalError } = require("../utils/http");


const crearTarea = async (req, res) => {
    try {

        const tar = new Tarea(req.body);
        const [{ id_tarea }] = await fnCrearTarea(tar);

        sendOk(res, `Tarea con el id ${id_tarea} creada correctamente`, { id_tarea });

    } catch (error) {

        internalError(res, `${error.message || 'error no controlado'}`, error);
    }
}

/**
 * Obtien todos las tareas del sistema
 * @param {*} req 
 * @param {*} res 
 */
const getTareas = async (req, res) => {
    try {

        const resp = await fnObtenerTareas();

        sendOk(res, `Tareas obtenidas correctamente`, resp);

    } catch (error) {
        internalError(res, `${error.message || 'error no controlado'}`, error);
    }
}

/**
 * Obtien todos los usuarios del sistema
 * @param {*} req 
 * @param {*} res 
 */
const delTarea = async (req, res) => {
    try {
        console.log(req.params)
        const { idTarea } = req.params
        const resp = await fnEliminarTarea(idTarea)
        console.log(resp)
        res.status('200');
        return;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    crearTarea,
    getTareas,
    delTarea
}
