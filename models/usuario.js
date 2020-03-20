const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
}

const create = ({ name, password, email }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into usuarios (name , password, email ) values (?,?,?)', [name, password, email], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const emailExists = (email) => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios where email = ?', [email], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        })
    });
};

/////

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios where id = ?', [id], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const update = ({ name, lastName, password, email }) => {
    return new Promise((resolve, reject) => {
        db.query('update usuarios set name=?, lastName=?, password=?, email=? ', [name, lastName, password, email]), (err, result) => {
            console.log(err)
            if (err) reject(err);
            resolve(result);
        }
    });
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('delete from usuarios where id = ?', [id],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
    });
}

module.exports = {
    getAll: getAll,
    create: create,
    emailExists: emailExists,
    update: update,
    getUser: getUser,
    deleteById: deleteById,
}
