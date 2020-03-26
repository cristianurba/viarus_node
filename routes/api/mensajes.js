const router = require('express').Router();

const Mensaje = require('../../models/mensaje');
const middleWares = require('../middlewares');

router.use(middleWares.checkToken);

// GET http://localhost:3000/api/mensajes/
router.get('/', async (req, res) => {
    console.log(req.headers);
    const rows = await Mensaje.getAll();
    res.json(rows);
});

//http://localhost:3000/api/mensajes/new
router.post('/new', async (req, res) => {
    console.log(req.payload.usuarioId);
    req.body.fk_usuario = req.payload.usuarioId
    const result = await Mensaje.create(req.body);
    res.json(result);
});


//PUT http://localhost:3000/api/mensajes/
router.put('/update', async (req, res) => {
    const result = await Mensaje.update(req.body);

    if (result['affectedRows'] === 1) {
        res.json({ success: 'El ejercicio se ha actualizado' });
    } else {
        res.json({ error: "El ejercicio no se ha actualizado" });
    }
});

/* //http://localhost:3000/api/mensajes/id
router.delete('/:mensajeId', async (req, res) => {
    //console.log('Llegamos')
    await Mensaje.deleteById(req.params.mensajeId)
    res.redirect('/');
}); */

//http://localhost:3000/api/mensajes/
router.delete('/', async (req, res) => {
    console.log(req.body.id)
    await Mensaje.deleteById(req.body.id)
    res.json('Se ha borrado el mensaje');
});

module.exports = router;