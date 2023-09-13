const { Router } = require("express");
const { postServiceHandler } = require("../Handlers/serviceHandler");
const {filterProducts} = require('../Handlers/filterServis');

const serviceRouter = Router();

serviceRouter.post("/", postServiceHandler);

serviceRouter.get('/search', filterProducts);

module.exports = serviceRouter;
