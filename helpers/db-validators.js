const Role = require('../models/rol');
const Usuario = require('../models/usuario');



const esRolValido = async (rol = '') => {
    const existRol = await Role.findOne({rol});
    if(!existRol){
        throw new Error('el rol no existe');
    }
}


const exiteEmail = async (correo = '') => {
    const exits = await Usuario.findOne({correo})
    if (exits){
        throw new Error('Ese correo ya esta en la base datos')
    }
}


module.exports = {
    esRolValido,
    exiteEmail
}