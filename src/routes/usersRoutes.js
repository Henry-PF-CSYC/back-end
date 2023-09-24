const { Router } = require("express");
const {
    createUser,
    getAllUsers,
    getAdmin,
    createAdmin,
    getContactAdmin,
    banOrUnbanUser,
    userDeleteAccount,

    setUnsetUserAsAdmin,
    getAdminByEmail,
} = require("../Handlers/userHandlers");

const userrouter = Router();

userrouter.get("/", getAllUsers);
userrouter.post("/", createUser);

userrouter.get("/admin", getAdmin);

userrouter.post("/admin", createAdmin);
userrouter.get("/admin/:admin_email", getAdminByEmail);
userrouter.put("/admin/:admin_email", setUnsetUserAsAdmin);

userrouter.get("/contact_admin", getContactAdmin);

userrouter.put("/ban/:user_email", banOrUnbanUser);

userrouter.delete("/delete/:user_email", userDeleteAccount);
module.exports = userrouter;
