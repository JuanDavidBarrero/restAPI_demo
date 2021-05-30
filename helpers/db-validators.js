const Role = require('../models/rol');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categorias');



const esRolValido = async (rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error('el rol no existe');
    }
}


const exiteEmail = async (correo = '') => {
    const exits = await Usuario.findOne({ correo })

    if (exits) {
        throw new Error('Ese correo ya esta en la base datos')
    }
}



const existeUsuarioByID = async (id) => {

    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    }

}

const existeCategoria = async (id) => {

    const existeEstaCategoria = await Categoria.findById(id);

    if (!existeEstaCategoria) {
        throw new Error(`El id ${id} no existe`);
    }
}


module.exports = {
    esRolValido,
    exiteEmail,
    existeUsuarioByID,
    existeCategoria
}