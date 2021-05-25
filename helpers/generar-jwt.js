const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                reject('No se pude generar el web token');
            } else {
                resolve(token)
            }
        });

    });

}

module.exports = { generarJWT }