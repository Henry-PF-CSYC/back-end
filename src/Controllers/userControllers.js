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
    const newUsers = await User.create({
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
    });
    return newUsers;
};

const getUserByName = async (name) => {
    const tolowercaseName = name.toLowerCase();
    const user = await User.findAll({
        where: { name: { [Op.iLike]: "%" + tolowercaseName + "%" } },
    });
    return user;
};
const getAdminController = async (req, res) => {
    const admin = await User.findOne({
        where: { role: "admin" },
    });

    console.log(admin);
    if (!admin) {
        throw new Error("No se encontró el administrador");
    }
    return admin;
};
const getAllUsersController = async () => {
    //all wher role is not admin
    return await User.findAll(
        {
            where: {
                role: {
                    [Op.not]: "admin",
                },
            },
        },
        { raw: true }
    );
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({
        where: { email: email },
    });
    return user;
};

module.exports = {
    postUserControler,
    getUserByName,
    getAllUsersController,
    getUserByEmail,
    getAdminController,
};
