const { Router } = require("express");
const { postServiceHandler } = require("../Handlers/serviceHandler");

const serviceRouter = Router();

serviceRouter.post("/", postServiceHandler);

module.exports = serviceRouter;
