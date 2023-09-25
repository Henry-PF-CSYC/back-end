const { User } = require("../db");
const { Op } = require("sequelize");

const banUserController = async (user_email, type) => {
    //ban or unban
    if (type === "ban") {
        const userToBan = await User.findOne({
            where: { email: user_email },
            paranoid: false,
        });

        if (!userToBan) {
            throw new Error("No se encontró el usuario");
        }

        let bannedUser = await userToBan.update({ role: "banned" });
        bannedUser = await userToBan.destroy();

        return bannedUser;
    } else if (type === "unban") {
        const userToUnban = await User.findOne({
            where: { email: user_email },
            paranoid: false,
        });

        if (!userToUnban) {
            throw new Error("No se encontró el usuario");
        }

        let unbannedUser = await userToUnban.update({ role: "user" });
        unbannedUser = await userToUnban.restore();

        return unbannedUser;
    }
};

const userDeleteAccountController = async (user_email) => {
    const userToDelete = await User.findOne({
        where: { email: user_email },
        paranoid: false,
    });

    if (!userToDelete) {
        throw new Error("No se encontró el usuario");
    }

    let deletedUser = await userToDelete.destroy({ force: true });
    return deletedUser;
};

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
    return await User.findAll(
        {
            where: {
                role: {
                    [Op.not]: ["admin", "contact_admin"],
                },
            },
        },
        { raw: true, paranoid: false }
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

const setUnsetUserAsAdminController = async (user_email, type) => {
    if (type === "set") {
        const userToSet = await User.findOne({
            where: { email: user_email },
        });

        if (!userToSet) {
            throw new Error("No se encontró el usuario");
        }

        let userSet = await userToSet.update({ role: "admin" });

        return userSet;
    } else if (type === "unset") {
        const userToUnset = await User.findOne({
            where: { email: user_email },
        });
        if (!userToUnset) {
            throw new Error("No se encontró el usuario");
        }

        let userUnset = await userToUnset.update({ role: "user" });

        return userUnset;
    }
};

const getAdminByEmailController = async (user_email) => {
    const admin = await User.findOne({
        where: { email: user_email },
        paranoid: false,
    });
    if (!admin) {
        throw new Error("No se encontró el administrador");
    }
    return admin;
};

module.exports = {
    postUserControler,
    getUserByName,
    getAllUsersController,
    getUserByEmail,
    getAdminController,
    getContactAdminController,
    banUserController,
    userDeleteAccountController,

    setUnsetUserAsAdminController,
    getAdminByEmailController,
};
