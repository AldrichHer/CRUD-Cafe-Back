const { validationResult } = require('express-validator');

const checkValidation = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
        next();
};

module.exports = {
    checkValidation
}