const router = require('express').Router();

const Mensaje = require('../../models/mensaje');

const mensajeId: pMensajesId;


//http://localhost:3000/api/mensajes/new
router.post('/new', async (req, res) => {
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

//http://localhost:3000/api/mensajes/id
router.delete('/:mensajeId', async (req, res) => {
    //console.log('Llegamos')
    await Mensaje.deleteById(req.params.mensajeId)
    res.redirect('/');
});

module.exports = router;