const { response, request } = require("express")



const esAdminRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: "se quiere hacer algo que no esta permitido"
        });
    }
    const { rol, nombre } = req.usuario

    if (rol !== 'ADMIN_ROL'){
        return res.status(400).json({
            msg: `${nombre} No es administrador`
        });
    }

    next();
}

module.exports = { esAdminRole }