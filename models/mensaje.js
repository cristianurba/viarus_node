const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from mensajes', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
}

<<<<<<< HEAD
const create = ({ mensaje, userId }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into mensajes (mensaje , userId ) values (?,?)', [mensaje, userId], (err, result) => {
=======
const create = ({ mensaje, fk_usuario }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into mensajes (mensaje, fk_usuario) values (?, ?)', [mensaje, fk_usuario], (err, result) => {
>>>>>>> 8b8b03d20839c7e1f0c79baea89e4c4a2e29bfba
            if (err) reject(err);
            resolve(result);
        })
    })
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('delete from mensajes where id = ?', [id],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        console.log(id)
    });
}

module.exports = {
    getAll: getAll,
    create: create,
    deleteById: deleteById,
}
