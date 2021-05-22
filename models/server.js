const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';


        this.conectarDb();


        this.middlewares();


        this.routes();
    }

    async conectarDb (){
        await dbConnection();
    }

    middlewares() {

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'))
    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/user'));


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server run on the port ${this.port}`)
        });
    }

}


module.exports = Server