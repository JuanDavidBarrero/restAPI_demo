const Role = require('../models/rol');



const esRolValido = async (rol = '') => {
    const existRol = await Role.findOne({rol});
    if(!existRol){
        throw new Error('el rol no existe');
    }
}


const exiteEmail = async () => {

}


module.exports = {
    esRolValido,
    exiteEmail
}