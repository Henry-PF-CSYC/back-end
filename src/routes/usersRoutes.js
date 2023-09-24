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

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", createUser);

userRouter.get("/admin", getAdmin);

userRouter.post("/admin", createAdmin);
userRouter.get("/admin/:admin_email", getAdminByEmail);
userRouter.put("/admin/:admin_email", setUnsetUserAsAdmin);

userRouter.get("/contact_admin", getContactAdmin);

userRouter.put("/ban/:user_email", banOrUnbanUser);

userRouter.delete("/delete/:user_email", userDeleteAccount);
module.exports = userRouter;
