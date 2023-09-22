const { Router } = require("express");
const {
    creatUser,
    getAllUsers,
    getAdmin,
    createAdmin,
    getContactAdmin,
} = require("../Handlers/userHandlers");

const userrouter = Router();

userrouter.get("/", getAllUsers);
userrouter.get("/admin", getAdmin);
//userrouter.get("/admin/:id", getAdminById)
userrouter.get("/contact_admin", getContactAdmin);

userrouter.post("/", creatUser);
userrouter.post("/admin", createAdmin);

// userrouter.put('/', putUsers);

// userrouter.delete('/', deleteUsers);

module.exports = userrouter;
