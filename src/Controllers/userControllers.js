const { User } = require("../db");
const { Op } = require("sequelize");

const postUserControler = async (
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
) => {
    const nameCapitalized =
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const lastnameCapitalized =
        lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();

    const [user, created] = await User.findOrCreate({
        where: { email: email },
        defaults: {
            name: nameCapitalized,
            lastname: lastnameCapitalized,
            username,
            email,
            password,
            phone,
            address,
            status,
            dni,
            image,
            role,
        },
    });
    if (!created) {
        throw new Error("El usuario ya existe");
    } else {
        return user;
    }
};

const getUserByName = async (name) => {
    const tolowercaseName = name.toLowerCase();
    const user = await User.findAll({
        where: { name: { [Op.iLike]: "%" + tolowercaseName + "%" } },
    });
    return user;
};
const getAdminController = async (req, res) => {
    //admin or contact_admin in role
    const admin = await User.findAll(
        {
            where: {
                role: {
                    [Op.or]: ["admin", "contact_admin"],
                },
            },
        },
        { raw: true }
    );

    if (!admin) {
        throw new Error("No se encontró el administrador");
    }
    return admin;
};
const getAllUsersController = async () => {
    //all wher role is not admin or contact_admin
    return await User.findAll(
        {
            where: {
                role: {
                    [Op.not]: ["admin", "contact_admin"],
                },
            },
        },
        { raw: true } //raw true to get only the data without metadata from sequelize
    );
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({
        where: { email: email },
    });
    return user;
};
const getContactAdminController = async (req, res) => {
    const contact_admin = await User.findOne({
        where: { role: "contact_admin" },
    });
    if (!contact_admin) {
        throw new Error("No se encontró el administrador de contacto");
    }
    return contact_admin;
};
module.exports = {
    postUserControler,
    getUserByName,
    getAllUsersController,
    getUserByEmail,
    getAdminController,
    getContactAdminController,
};
