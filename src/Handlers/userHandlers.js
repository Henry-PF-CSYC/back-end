const {
    postUserControler,
    getUserByName,
    getAllUsersController,
} = require("../Controllers/userControllers");

const getAllUsers = async (req, res) => {
    const { name } = req.query;
    try {
        const user = name
            ? await getUserByName(name)
            : await getAllUsersController();
        if (user.length == 0) {
            return res
                .status(400)
                .json({ message: "El usuario solicitado no existe" });
        }
        return res.status(200).json(user);
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
