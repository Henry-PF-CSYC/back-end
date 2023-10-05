const { Router } = require("express");
const {
    contactAdminHandler,
    setContactAdmin,
} = require("../Handlers/contactHandler");

const contactRouter = Router();

contactRouter.post("/send", contactAdminHandler);
contactRouter.put("/set_target/:admin_email", setContactAdmin);

module.exports = contactRouter;
