const router = require('express').Router();

const Mensaje = require('../../models/mensaje');


//http://localhost:3000/api/mensajes/getall

router.get('/getall', async (req, res) => {
    const rows = await Mensaje.getAll();
    res.json(rows);
})


//http://localhost:3000/api/mensajes/new
router.post('/new', async (req, res) => {
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


//http://localhost:3000/api/mensajes/id
router.delete('/:mensajeId', async (req, res) => {
    await Mensaje.deleteById(req.params.mensajeId)
    res.redirect('/');
});

module.exports = router;