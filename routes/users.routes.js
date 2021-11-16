const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, getUsers, putUsers, postUsers, deleteUsers } = require('../controllers/users.controller');
const { validRole, checkEmail, checkIfId } = require('../helpers/db-validators');
const { checkValidation } = require('../middlewares/checkValidation');
const router = Router();


router.get('/:id', getUser);
router.get('/', getUsers);
router.put('/:id', [
    check('id','ID is not valid').isMongoId(),
    check('id').custom(checkIfId),
    check('role').custom(validRole),
    checkValidation
], putUsers);
router.post('/', [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(checkEmail),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    check('password', 'Password is required').notEmpty(),
    // check('role','Role is not valid').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(validRole),
    checkValidation
], postUsers);
router.delete('/:id',[
    check('id','ID is not valid').isMongoId(),
    check('id').custom(checkIfId),
    checkValidation
], deleteUsers);




module.exports = router;