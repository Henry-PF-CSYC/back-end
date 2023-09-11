const {User} = require('../db');

const postUserControler = async (name, lastname, username, email, password, phone, address, status) =>{
    const newUsers = await User.create({name, lastname, username, email, password, phone, address, status})
    return newUsers
}
module.exports = postUserControler;