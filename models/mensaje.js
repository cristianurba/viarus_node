const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select mensajes.*, usuarios.id as userId, usuarios.image, usuarios.name, usuarios.email, usuarios.password, usuarios.fecha_registro  from mensajes inner join usuarios on fk_usuario = usuarios.id order by fecha_creacion DESC', (err, rows) => {
            if (err) reject(err);
            console.log(rows);
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

/* const find = (busqueda) => {
    return new Promise((resolve, reject) => {
        console.log(busqueda);
        db.query('select * from mensajes where mensaje like ?', [`%${busqueda}%`], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
} */

const find = (busqueda) => {
    return new Promise((resolve, reject) => {
        console.log(busqueda);
        db.query('select mensajes.*, usuarios.id as userId, usuarios.image, usuarios.name, usuarios.email from mensajes inner join usuarios on fk_usuario = usuarios.id where mensaje like ? order by fecha_creacion DESC', [`%${busqueda}%`], (err, result) => {
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
    find: find
}
