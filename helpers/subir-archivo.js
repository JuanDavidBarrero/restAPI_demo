const path = require('path');
const {v4:uuid } = require('uuid');

const subirArchivos = ( files, extensionesValidas = ['png', 'jpg', 'gif'], carpeta ='' ) => {


    return new Promise( (resolve, reject) => {

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');

        const extencion = nombreCortado[nombreCortado.length - 1];


        if (!extensionesValidas.includes(extencion)) {
            return reject("No es una extension valida"); 
        }

        const nombreTemp = uuid() + '.' + extencion;

        const uploadPath = path.join(__dirname, '../uploads/', carpeta ,nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            return resolve(nombreTemp);
        });

    });


}


module.exports = {
    subirArchivos
}