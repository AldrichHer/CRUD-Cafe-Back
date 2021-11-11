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

const getUsers = (req = request, res = response) => {
    const { id = 0, name } = req.query;
    res.json({
        message: "GET users desde el controller de API",
        id,
        name
    });
};

const putUsers = async (req = request, res = response) => {
    const {id} = req.params;
    const {_id,password, google, email,...rest}  = req.body;

    if(password){
    //Hash de contraseña
    const salt  = bcryptjs.genSaltSync(10);
    rest.password = bcryptjs.hashSync(password,salt);
    }
    const user = await Usuario.findByIdAndUpdate(id,rest)
    res.json({
        // message: "PUT users desde API",
        user
    });
};

const postUsers = async (req = request, res = response) => {


    // const { name, age } = req.body;
    const {name, email, password, role} = req.body;
    const usuario = new Usuario( {name, email, password, role} );
    
    //Hash de contraseña
    const salt  = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,salt);
    //Guardar
    await usuario.save();

    res.json({
        message: "POST users desde API",
        usuario
    });
};

const deleteUsers = (req = request, res = response) => {
    res.json({
        message: "DELETE users desde API"
    });
};


module.exports = {
    getUser, getUsers, putUsers, postUsers, deleteUsers
}