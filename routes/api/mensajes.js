const router = require('express').Router();

const Mensaje = require('../../models/mensaje');
const middleWares = require('../middlewares');

router.use(middleWares.checkToken);

// GET http://localhost:3000/api/mensajes/
router.get('/', async (req, res) => {
    const rows = await Mensaje.getAll();
    res.json(rows);
});

//GET http://localhost:3000/api/mensajes/find
router.post('/find', async (req, res) => {
    console.log('FIND', req.body);
    const rows = await Mensaje.find(req.body.busqueda);
    res.json(rows);
})

//http://localhost:3000/api/mensajes/new
router.post('/new', async (req, res) => {
    console.log(req.payload.usuarioId);
    req.body.fk_usuario = req.payload.usuarioId
    const result = await Mensaje.create(req.body);
    res.json(result);
});

//http://localhost:3000/api/mensajes/
router.delete('/', async (req, res) => {
    await Mensaje.deleteById(req.body.id)
    res.json('Se ha borrado el mensaje');
});

module.exports = router;