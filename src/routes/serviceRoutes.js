const { Router } = require("express");

const { postServiceHandler, getAllService, getServiceById } = require("../Handlers/serviceHandler");

const serviceRouter = Router();
serviceRouter.get("/", getAllService)
serviceRouter.get("/:id", getServiceById)






serviceRouter.post("/", postServiceHandler);

module.exports = serviceRouter;
