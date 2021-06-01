const path = require('path');
const fs = require('fs');

const { request, response } = require("express");

const { subirArchivos } = require("../helpers/subir-archivo");

const Usuario = require('../models/usuario');

const cargarArchivos = async (req = request, res = response) => {


    try {

        const nombreCompleto = await subirArchivos(req.files, undefined, 'img');
        return res.json({ nombreCompleto });

    } catch (error) {

        return res.status(400).json(error);
    }


}

const actualizarImagenUser = async (req = request, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msg: "no exite un usuario con este id"
                });
            }

            break;

        default:
            return res.status(500).json({
                msg: "se me olvido esto"
            });
    }


    if (modelo.img) {
        const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);

        if (fs.existsSync(pathImg)) {

            fs.unlinkSync(pathImg);

        }
    }

    const nombre = await subirArchivos(req.files, undefined, coleccion);

    modelo.img = nombre;

    await modelo.save();

    return res.json(modelo);

}

const mostrarImg = async (req = request, res = response) => {

    const { id, coleccion } = req.params

    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msg: "no exite un usuario con este id"
                });
            }

            break;

        default:
            return res.status(500).json({
                msg: "se me olvido esto"
            });
    }


    if (modelo.img) {
        const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);

        if (fs.existsSync(pathImg)) {

            return res.sendFile(pathImg)

        }
    }


}


module.exports = {
    cargarArchivos,
    actualizarImagenUser,
    mostrarImg
}