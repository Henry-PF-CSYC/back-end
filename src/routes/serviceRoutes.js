const { Router } = require("express");

const { postServiceHandler, getAllService, getServiceById } = require("../Handlers/serviceHandler");
const {filterservice} = require('../Handlers/filterHandler');


const serviceRouter = Router();
serviceRouter.get("/", getAllService)
serviceRouter.get("/:id", getServiceById)






serviceRouter.post("/", postServiceHandler);

serviceRouter.get('/search', filterservice);

module.exports = serviceRouter;
