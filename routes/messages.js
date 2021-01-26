/*
    path: /api/messages
*/

const { Router } = require('express');
const { obtainChat } = require('../controllers/messages');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

router.get('/:from', validateJWT, obtainChat);

module.exports = router;