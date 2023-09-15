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

const getAllUsersController = async () => {
    return await User.findAll();
};

module.exports = { postUserControler, getUserByName, getAllUsersController };
