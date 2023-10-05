const {
    postUserController,
    getUserByName,
    getAllUsersController,
    getUserByEmail,
    getAdminController,
    getContactAdminController,
    banUserController,
    userDeleteAccountController,
    setUnsetUserAsAdminController,
    getAdminByEmailController,
    updateUserController,
} = require("../Controllers/userControllers");

const updateUser = async (req, res) => {
    try {
        const user = await updateUserController(req);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const banOrUnbanUser = async (req, res) => {
    const { user_email } = req.params;
    const { type } = req.query;

    try {
        const user = await banUserController(user_email, type);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const userDeleteAccount = async (req, res) => {
    const { user_email } = req.params;
    try {
        const user = await userDeleteAccountController(user_email);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getAdmin = async (req, res) => {
    try {
        const admin = await getAdminController();
        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
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
const createAdmin = async (req, res) => {
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
    } = req.body;
    const role = "admin";
    try {
        const newAdmin = await postUserController(
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
        res.status(200).json(newAdmin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
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
    } = req.body;
    try {
        const role = "user";
        const newUsers = await postUserController(
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
const getContactAdmin = async (req, res) => {
    try {
        const info = await getContactAdminController();
        res.status(200).json(info);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const setUnsetUserAsAdmin = async (req, res) => {
    const { admin_email } = req.params;
    const { type } = req.query;
    try {
        const admin = await setUnsetUserAsAdminController(admin_email, type);
        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAdminByEmail = async (req, res) => {
    const { admin_email } = req.params;
    try {
        const admin = await getAdminByEmailController(admin_email);
        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getAdmin,
    createAdmin,
    getContactAdmin,
    banOrUnbanUser,
    userDeleteAccount,
    updateUser,
    setUnsetUserAsAdmin,
    getAdminByEmail,
};
