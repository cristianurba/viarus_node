const router = require('express').Router();

const Mensaje = require('../../models/mensaje');
const middleWares = require('../middlewares');

<<<<<<< HEAD

//http://localhost:3000/api/mensajes/getall

router.get('/getall', async (req, res) => {
    const rows = await Mensaje.getAll();
    res.json(rows);
})
=======
router.use(middleWares.checkToken);
>>>>>>> e426e63900e15c107067677623bdd4806236daba

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


// http://localhost:3000/api/mensajes/edit/id
router.put('/edit/:mensajeId', async (req, res) => {

    const result = await Mensaje.update(req.body, req.params.mensajeId);

    if (result) {
        res.json(result)
    } else {
        res.json({ error: 'Error al actualizar mensaje' })
    }
});

<<<<<<< HEAD

//http://localhost:3000/api/mensajes/id
=======
/* //http://localhost:3000/api/mensajes/id
>>>>>>> e426e63900e15c107067677623bdd4806236daba
router.delete('/:mensajeId', async (req, res) => {
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