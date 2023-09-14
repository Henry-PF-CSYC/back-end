const { Router } = require("express");

const { postServiceHandler, getAllService, getServiceById } = require("../Handlers/serviceHandler");
const {filterServis} = require('../Handlers/filterHandler');


const serviceRouter = Router();
serviceRouter.get("/", getAllService)
serviceRouter.get("/:id", getServiceById)






serviceRouter.post("/", postServiceHandler);

serviceRouter.get('/search', filterServis);

module.exports = serviceRouter;
