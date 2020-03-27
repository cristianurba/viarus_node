const router = require('express').Router();
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const { check, validationResult } = require('express-validator');
const middleware = require('../middlewares');

const Usuario = require('../../models/usuario');

// http://localhost:3000/api/usuarios
router.get('/', middleware.checkToken, async (req, res) => {
    const rows = await Usuario.getUser(req.payload.usuarioId);
    res.json(rows);
});

// http://localhost:3000/api/usuarios/register
router.post('/register', [
    check('name', 'El nombre de usuario debe tener entre 3 y 15 caracteres').isLength({ min: 3, max: 30 }).isAlphanumeric(),
    check('email', 'El email no está bien puesto').isEmail(),
    check('password', 'La password debe tener entre 4 y 20 caracteres').custom((value) => {
        return (/^(?=.*\d).{4,20}$/).test(value);
    })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    }

    const passwordEnc = bcrypt.hashSync(req.body.password, 10);
    req.body.password = passwordEnc;

    const result = await Usuario.create(req.body);
    if (result.affectedRows === 1) {
        const user = Usuario.getUser(result.insertId);
        res.json({ token: createToken(user), id: result.insertId })
    };

});

const createToken = (pUser) => {
    const payload = {
        usuarioId: pUser.id,
        fechaCreacion: moment().unix(),
        fechaExpiracion: moment().add(45, 'minutes').unix()
    }

    return jwt.encode(payload, process.env.SECRET_KEY);
};

// http://localhost:3000/api/usuarios/login
router.post('/login', async (req, res) => {
    try {
        const user = await Usuario.emailExists(req.body.email);
        if (!user) {
            return res.status(401).json({ error: 'Error en email y/o password' })
        }
        console.log(req.body.password, user.password);
        const iguales = bcrypt.compareSync(req.body.password, user.password);
        if (iguales) {
            res.json({ token: createToken(user), userId: user.id })
        } else {
            res.status(401).json({ error: 'Error en email y/o password' })
        }
    } catch (err) {
        console.log(err);
    }
});

// http://localhost:3000/api/usuarios/edit/id
router.put('/edit/:usuarioId', async (req, res) => {
    // console.log(req.body, req.params.usuarioId
    const passwordEnc = bcrypt.hashSync(req.body.password, 10);
    req.body.password = passwordEnc;

    const result = await Usuario.update(req.body, req.params.usuarioId);

    if (result) {
        res.json(result)
    } else {
        res.json({ error: 'Error al actualizar usuario' })
    }
});

//http://localhost:3000/api/usuarios/id
router.delete('/:usuarioId', async (req, res) => {
    //console.log('Llegamos')
    await Usuario.deleteById(req.params.usuarioId)
    res.redirect('/');

    /* const result = await Usuario.deleteById(req.body.usuarioId);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Nos alegramos de que ya estes sano' });
    } else {
        res.json({ error: 'Usuario no borrado' })
    } */

});

module.exports = router;