const {
    postUserControler,
    getUserByName,
    getAllUsersController,
    getUserByEmail
} = require("../Controllers/userControllers");

const getAllUsers = async (req, res) => {
    const { name, email } = req.query;

    try {
        if (name) {
            // Si se proporciona un valor para 'name', busca por nombre
            const user = await getUserByName(name);
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "El usuario solicitado no existe" });
            }
            return res.status(200).json(user);
        } else if (email) {
            // Si se proporciona un valor para 'email', busca por email
            const user = await getUserByEmail(email);
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "El usuario solicitado no existe" });
            }
            return res.status(200).json(user);
        } else {
            // Si no se proporcionan 'name' ni 'email', obtiene todos los usuarios
            const users = await getAllUsersController();
            if (users.length === 0) {
                return res
                    .status(400)
                    .json({ message: "No se encontraron usuarios" });
            }
            return res.status(200).json(users);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const creatUser = async (req, res) => {
    const {
        name,
        lastname,
        username,
        email,
        password,
        phone,
        address,
        status,
        dni,
        image,
        role,
    } = req.body;
    try {
        const newUsers = await postUserControler(
            name,
            lastname,
            username,
            email,
            password,
            phone,
            address,
            status,
            dni,
            image,
            role
        );
        res.status(200).json(newUsers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { creatUser, getAllUsers };
