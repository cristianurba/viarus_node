const router = require('express').Router();
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const { check, validationResult } = require('express-validator');


const Usuario = require('../../models/usuario');

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
        fechaExpiracion: moment().add(15, 'minutes').unix()
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
            res.json({ token: createToken(user) })
        } else {
            res.status(401).json({ error: 'Error en email y/o password' })
        }
    } catch (err) {
        console.log(err);
    }
});

// http://localhost:3000/api/usuarios/edit/id
router.put('/edit/:usuarioId', (req, res) => {
    Usuario.getUser(req.params.usuarioId, (err, usuario) => {
        if (err) return res.json(err);
        res.render('/usuarioEdit', { user: usuario });
    })
});

// http://localhost:3000/api/delete/id
router.delete('/delete/:usuarioId', async (req, res) => {
    await Usuario.deleteById(req.params.usuarioId)
    res.redirect('/');
});

module.exports = router;