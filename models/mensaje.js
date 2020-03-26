const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from mensajes inner join usuarios on fk_usuario = usuarios.id order by fecha_creacion DESC', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
}

const create = ({ mensaje, fk_usuario }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into mensajes (mensaje, fk_usuario) values (?, ?)', [mensaje, fk_usuario], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const update = ({ mensaje }, id) => {
    return new Promise((resolve, reject) => {
        db.query('update mensajes set mensaje=? where id = ?', [mensaje, id], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
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
    update: update,
    deleteById: deleteById,
}
