const { response, request } = require('express')
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const getUser = (req = request, res = response) => {
    const { id } = req.params;
    res.json({
        id: id,
        name: "Nombre del usuario"
    })
};

const getUsers = async (req = request, res = response) => {
    let { limit = 5, from = 0 } = req.query;
    const stateFind = {state: true}

    typeof(limit) != 'number'? limit = 5: limit = limit;
    typeof(from) != 'number'? from = 5: from = from;

    const [total,users] = await Promise.all([
        Usuario.countDocuments(stateFind),
        Usuario.find(stateFind)
            .skip(Number(from))
            .limit(Number(limit))

    ]);

    res.json({
        total,
        users
        // message: "GET users desde el controller de API",
    });
};

const putUsers = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
        //Hash de contraseña
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync(password, salt);
    }
    const user = await Usuario.findByIdAndUpdate(id, rest)
    res.json({
        // message: "PUT users desde API",
        user
    });
};

const postUsers = async (req = request, res = response) => {


    // const { name, age } = req.body;
    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    //Hash de contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);
    //Guardar
    await usuario.save();

    res.json({
        message: "POST users desde API",
        usuario
    });
};

const deleteUsers = async (req = request, res = response) => {
    const {id} = req.params;
    //BORRADO FISICO
    // const user = await Usuario.findByIdAndDelete(id);

    //CAMBIAR STATE
    const user = await Usuario.findOneAndUpdate(id,{state:false});

    res.json({
        id:id,
        // message: "DELETE users desde API"
        user
    });
};


module.exports = {
    getUser, getUsers, putUsers, postUsers, deleteUsers
}