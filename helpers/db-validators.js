const Role = require('../models/role');
const Usuario = require('../models/usuario');


const validRole = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`Role ${role} is not valid`);
    }
}

const checkEmail = async (email = '') => {
    const existeEmail = await Usuario.findOne({email});
    if (existeEmail) {
        throw new Error(`${email} is already registered`);
    }
}



module.exports = {
    validRole,
    checkEmail
}