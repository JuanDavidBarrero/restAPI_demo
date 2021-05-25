const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('token');

    if (!token) {
        return res.status(500).json({
            msg: "no hay token en la petición"
        });
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETKEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario){
            return res.status(401).json({
                msg:"el usario no existe en la base de datos"
            });
        }

        if (!usuario.estado){
            return res.status(401).json({
                msg: "No se puede realizar esta acción"
            });
        }

        req.usuario = usuario;

        next();
        
    } catch (error) {
        
        return res.status(401).json({ 
            msg: "token no valido"
        });

    } 

}

module.exports = {
    validarJWT
}