const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from mensajes', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
}

const create = ({ mensaje, userId }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into mensajes (mensaje , userId ) values (?,?)', [mensaje, userId], (err, result) => {
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
