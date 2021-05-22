const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    const { nombre, apikey, temp = 'No hay temperatura' } = req.query;

    res.json({
        msg: "Hola a controlador",
        nombre,
        apikey, 
        temp
    });
}


const usuariosPost = async (req = request, res = response) => {

    const {nombre, correo, password, rol} = req.body;

    const usuario = new Usuario( {nombre, correo, password, rol} );


    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.json({
        msg: "Hola a controlador",
        usuario
    });
}

const usuariosPut = (req = request, res = response) => {

    const id = req.params.id;

    res.json({
        msg: "Hola a controlador",
        id
    });
}

const usuariosDelete = (req = request, res = response) => {
    res.json({
        msg: "Hola a controlador",
        result: "delete"
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}