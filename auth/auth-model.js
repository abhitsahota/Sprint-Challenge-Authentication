const db = require('../database/dbConfig.js')

module.exports = {
    register,
    findByUsername
}

async function register(user) {
    const [id] = await  db('users').insert(user, 'id').returning('id');
    return db('users').where({id}).first()
}

function findByUsername(filter) {
    return db("users").where('username', filter);
}