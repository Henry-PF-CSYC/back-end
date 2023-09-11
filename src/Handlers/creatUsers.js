const postUserControler = require('../Controllers/postUsers');
const creatUser = async (req, res)=> {
    const{name, lastname, username, email, password, phone, address, status} = req.body;
    try {

        const newUsers = await postUserControler(name, lastname, username, email, password, phone, address, status);
        res.status(200).json(newUsers) 
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
module.exports = creatUser;