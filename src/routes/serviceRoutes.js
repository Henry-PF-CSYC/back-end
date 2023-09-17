const { Router } = require("express");

const { postServiceHandler, getAllService, getServiceById, getAllServicesHandler } = require("../Handlers/serviceHandler");
const {filterservice, filterServiceByPriceRange} = require('../Handlers/filterHandler');


const serviceRouter = Router();
serviceRouter.get("/", getAllService)
serviceRouter.get("/:id", getServiceById)

/*Paginado */
serviceRouter.get("/", getAllServicesHandler)



serviceRouter.post("/", postServiceHandler);

serviceRouter.get('/filter?', filterservice);
serviceRouter.get('/search', filterServiceByPriceRange);


module.exports = serviceRouter;
