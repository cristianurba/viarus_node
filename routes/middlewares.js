const jwt = require('jwt-simple');
const moment = require('moment');
const fs = require('fs'); // librería file system, para trabajar con ficheros

const checkToken = (req, res, next) => {

    // 1º: Comprobar si existe la cabecera user-token
    if (!req.headers['user-token']) {
        console.log(req.headers['user-token']);
        return res.json({ error: 'Debes incluir la cabecera user-token' });
    }

    // 2º: Comrpobar si el token es correcto
    const token = req.headers['user-token'];
    let payload = null;
    try {
        payload = jwt.decode(token, process.env.SECRET_KEY);
    } catch (err) {
        return res.json({ error: 'El token es incorrecto' });
    }

    // 3º: Comprobar si el token ha expirado
    const fechaActual = moment().unix();

    if (fechaActual > payload.fechaExpiracion) {
        return res.json({ error: 'El token está caducado' });
    }

    req.payload = payload;

    next();
};

module.exports = {
    checkToken: checkToken
}