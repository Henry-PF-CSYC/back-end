const { Router } = require("express");
const {
    createUser,
    getAllUsers,
    getAdmin,
    createAdmin,
    getContactAdmin,
    banOrUnbanUser,
    userDeleteAccount,
} = require("../Handlers/userHandlers");

const userrouter = Router();

userrouter.get("/", getAllUsers);
userrouter.post("/", createUser);
userrouter.get("/admin", getAdmin);
//userrouter.get("/admin/:id", getAdminById)
userrouter.get("/contact_admin", getContactAdmin);

userrouter.post("/admin", createAdmin);

userrouter.put("/ban/:user_email", banOrUnbanUser);

userrouter.delete("/delete/:user_email", userDeleteAccount); //this is for a user to delete its own account

module.exports = userrouter;
