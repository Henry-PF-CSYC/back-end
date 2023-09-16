const { Router } = require("express");
const { contactAdminHandler } = require("../Handlers/contactHandler");

const contactRouter = Router();

contactRouter.post("/send", contactAdminHandler);

module.exports = contactRouter;
