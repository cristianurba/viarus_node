const router = require('express').Router();

const Mensaje = require('../../models/mensaje');

<<<<<<< HEAD
//const mensajeId: pMensajesId;
=======
/* const mensajeId: pMensajesId; */
>>>>>>> 8b8b03d20839c7e1f0c79baea89e4c4a2e29bfba


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
    MensajesId: pMensaje.id,
        await Mensaje.deleteById(req.params.MensajesId)
    res.redirect('/');
});

module.exports = router;