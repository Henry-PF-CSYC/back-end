const { Router } = require("express");

const {
    postServiceHandler,
    getAllService,
    getServiceById,
    postArrayServiceHandler,
} = require("../Handlers/serviceHandler");

const serviceRouter = Router();
serviceRouter.get("/", getAllService);
serviceRouter.get("/:id", getServiceById);

serviceRouter.post("/", postServiceHandler);
serviceRouter.post("/array", postArrayServiceHandler);

module.exports = serviceRouter;
