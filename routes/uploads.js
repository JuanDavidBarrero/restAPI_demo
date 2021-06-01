const { Router, response } = require('express');
const { check  } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarArchivo } = require('../middlewares/validar-archivo');

const { cargarArchivos,actualizarImagenUser, mostrarImg} = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const router = Router();


router.post('/', validarArchivo ,cargarArchivos);

router.put('/:coleccion/:id',[
    check('id',"debe ser mongo").isMongoId(),
    validarArchivo,
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
    validarCampos
] ,actualizarImagenUser);

router.get('/:coleccion/:id', [
    check('id','No es un id valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c , ['usuarios','productos'] ) ),
    validarCampos
], mostrarImg );


module.exports = router;