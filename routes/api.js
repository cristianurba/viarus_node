const router = require('express').Router();

const apiUsuariosRouter = require('./api/usuarios');
const apiMensajesRouter = require('./api/mensajes')

router.use('/usuarios', apiUsuariosRouter);
router.use('/mensajes', apiMensajesRouter);

module.exports = router;