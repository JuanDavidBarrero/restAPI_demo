const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    const { from = 0, to = 5 } = req.query;


    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true }).skip(Number(from)).limit(Number(to)),
    ]);

    //const usuarios = await Usuario.find({estado:true}).skip(Number(from)).limit(Number(to))

    //const total = await Usuario.countDocuments({estado:true});

    res.json({
        total,
        usuarios
    });
}


const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });


    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        msg: "Creado correctamente",
        usuario
    });
}

const usuariosPut = async (req = request, res = response) => {

    const { id } = req.params.id;

    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findOneAndUpdate(id, resto);

    res.json({
        msg: "Actualizado",
        usuario
    });
}

const usuariosDelete = async (req = request, res = response) => {

    const { id } = req.params;

    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });


    res.json({
        msg: "Usuario eliminado correctamente",
        usuario
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}