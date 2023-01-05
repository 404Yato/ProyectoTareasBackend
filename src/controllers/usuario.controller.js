const db = require("../config/db/config");

const { fnCrearUsuario, fnValidarLoginUsuario, fnObtenerUsuarios, fnObtenerUsuarioById } = require('../config/storedFunction/call/usuario');
const { User } = require("../model/userModel");
const { sendOk, internalError } = require("../utils/http");

/**
 * Obtien todos los usuarios del sistema
 * @param {*} req 
 * @param {*} res 
 */
const getUsuarios = async (req, res) => {
    try {

        const resp = await fnObtenerUsuarios();

        sendOk(res, `Usuarios obtenidos correctamente`, resp);

    } catch (error) {
        internalError(res, `${error.message || 'error no controlado'}`, error);
    }
}

/**
 * 
 * @param {String} req Se obtiene el nombre, apellido, email, pass,userName y rolId del body
 * @param {Any} res Respuesta del servicio
 * @returns {Promise<[Any]>} Retorna el id_usuario
 */
const crearUsuario = async (req, res) => {
    try {

        const user = new User(req.body);

        const resp = await fnCrearUsuario(user);

        sendOk(res, `Usuario ${resp} ha sido creado correctamente`, { resp });

    } catch (error) {

        internalError(res, `${error.message || 'error no controlado'}`, error);
    }
}

/**
 * Validar login usuario
 * @param {String} req Se obtiene el username y pass del body
 * @param {*} res 
 * @returns Retorna los datos del usuario logeado
 */
const validarLoginUsuario = async (req, res) => {
    try {
        const { username, pass } = req.body

        const result = await fnValidarLoginUsuario(username, pass);

        sendOk(res, `Usuario logeado correctamente`, ...result);

    } catch (error) {
        internalError(res, `${error.message || 'error no controlado'}`, error);
    }
}


const obtenerUsuarioById = async (req, res) => {
    try {

        const { idUser } = req.params

        const result = await fnObtenerUsuarioById(idUser);

        sendOk(res, `Usuario con el id ${idUser} encontrado correctamente`, ...result);

    } catch (error) {
        internalError(res, `${error.message || 'error no controlado'}`, error);
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    validarLoginUsuario,
    obtenerUsuarioById
}
