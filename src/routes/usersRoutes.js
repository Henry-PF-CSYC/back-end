const { Router } = require("express");
const {
    creatUser,
    getAllUsers,
    getAdmin,
    createAdmin,
} = require("../Handlers/userHandlers");

const userrouter = Router();

userrouter.get("/", getAllUsers);
userrouter.get("/admin", getAdmin);

userrouter.post("/", creatUser);
userrouter.post("/admin", createAdmin);

// userrouter.put('/', putUsers);

// userrouter.delete('/', deleteUsers);

module.exports = userrouter;
