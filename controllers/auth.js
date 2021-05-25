const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const {generarJWT} = require('../helpers/generar-jwt');

const Usuario = require('../models/usuario');



const login = async (req = request, res = response) => {

    const { correo, password } = req.body;


    try {

        const usuario = await Usuario.findOne({correo});

        if (!usuario){
            return res.status(400).json({
                msg:"Usuario / password no es correcto"
            });
        }

        if (!usuario.estado){
            return res.status(400).json({
                msg: "Es usuario esta eliminado"
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword){
            return res.status(400).json({
                msg:"No hay coincidencia en la base"
            });
        }


        const token = await generarJWT(usuario.id);

        return res.json({
            usuario,
            token 
        });

    } catch (error) {

        return res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }
}


module.exports = {
    login
}