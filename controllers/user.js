const {response, request} = require('express');


const usuariosGet = (req = request, res = response) => {

    const { nombre, apikey, temp = 'No hay temperatura' } = req.query;

    res.json({
        msg: "Hola a controlador",
        nombre,
        apikey, 
        temp
    });
}


const usuariosPost = (req = request, res = response) => {

    const body = req.body;

    res.json({
        msg: "Hola a controlador",
        body
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