const { response, request } = require("express");
const Categoria = require('../models/categorias');




const agregarCategoria = async (req=request, res = response) => { 

    const {nombre} = req.body;


    const categoriaDB = await Categoria.findOne({nombre});

    if (categoriaDB) {
        return res.status(400).json({
            msg: "La categoria ya existe"
        });
    }

    const data = {
        nombre,
        usuario : req.usuario._id
    }

    const categoria = new  Categoria(data);
    
    await categoria.save();

    return res.json(data);
} 

const obtenerCategorias = async (req = request, res = response) => {
    const {from, to} = req.query;

    const query = {estado:true};

    const [total,categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).skip(Number(from)).limit(Number(to)).populate('usuario','nombre')
    ]);

    return res.json({
        total,
        categorias
    });

}


const obtenerCategoriaPorID = async(req=request,res=response) => {
    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate('usuario','nombre');

    return res.json(categoria);

}


const actualizarCategoria = async (req=request,res=response) => {
    const {id} = req.params;

    const {estado, usuario, ...data} = req.body;

    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true});

    return res.json(categoria);
}

const eliminarCategoria = async (req=request,res=response) => {
    const {id} = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id,{estado:false});

    return res.json(categoriaBorrada);

}

module.exports = {
    agregarCategoria,
    obtenerCategorias,
    obtenerCategoriaPorID,
    actualizarCategoria,
    eliminarCategoria
}