const getAllUsers = async (req, res) => {
    const {name} = req.querry;
    try {
        const user = name ? await getUserByName(name) 
        : await getAllUsers();
        if(user.length == 0){
            return res.status(400).json({message:"El usuario solicitado no existe"})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
module.exports = getAllUsers;