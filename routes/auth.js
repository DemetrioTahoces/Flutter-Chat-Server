/*
path: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');
const router = Router();

router.post('/new', [
    check('name', 'The name is compulsory').not().isEmpty(),
    check('password', 'The password is compulsory').not().isEmpty(),
    check('email', 'The email is compulsory').isEmail(),
    validateFields,
], createUser);

router.post('/', [
    check('password', 'The password is compulsory').not().isEmpty(),
    check('email', 'The email is compulsory').isEmail(),
    validateFields,
], loginUser);

router.get('/renew', validateJWT, renewToken);

module.exports = router;