const { Router } = require('express');
const { check  } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/user');
const { esRolValido, exiteEmail } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/', usuariosGet);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','la contraseña debe ser de más de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo','El correo no es valido').custom(exiteEmail),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROL','VENTAS_ROL']),
    check('rol').custom(esRolValido),
    validarCampos,
],usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);


module.exports = router;