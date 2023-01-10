const express = require('express');
const { usuarioController } = require('../controllers');
//const { getUsuarios } = require('../controllers');
const router = express.Router();

const defaultPath = process.env.DEFAULT_PATH_API;

router.get(`/${defaultPath}/usuario/obtener-usuarios`, usuarioController.getUsuarios);
router.get(`/${defaultPath}/usuario/obtener-usuario-by-id/:idUser`, usuarioController.obtenerUsuarioById);
router.post(`/${defaultPath}/usuario/crear-usuario`, usuarioController.crearUsuario);
router.post(`/${defaultPath}/usuario/validar-login-usuario`, usuarioController.validarLoginUsuario);
router.delete(`/${defaultPath}/usuario/eliminar-usuario/:idUser`, usuarioController.eliminarUsuario);

router.post(`/${defaultPath}/usuario/modificar-usuario/:idUser`, usuarioController.modUsuario)

module.exports = router;