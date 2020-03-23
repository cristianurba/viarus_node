const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from mensajes', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
}

const create = ({ message, userId }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into mensajes (message , userId ) values (?,?)', [message, userId], (err, result) => {
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
