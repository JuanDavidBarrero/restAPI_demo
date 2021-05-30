const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos');
const {esAdminRole} = require('../middlewares/validar-roles');

const { existeCategoria } = require('../helpers/db-validators');

const { agregarCategoria, obtenerCategorias, obtenerCategoriaPorID, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');

const router = Router();


router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoriaPorID);


router.post('/', [validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], agregarCategoria);


router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],eliminarCategoria);


module.exports = router;