const express = require('express')
const cors = require('cors');
const { dbConecction } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'

        //CONECTAR A DB
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();
    }


    async conectarDB() {
        await dbConecction();
    }

    middlewares() {
        this.app.use(cors());

        //Lectura y parseo del Body
        this.app.use(express.json());

        //servir en / el index de public
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/users.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App corriendo en el puerto ${this.port}`)
        })
    }
}


module.exports = Server;
