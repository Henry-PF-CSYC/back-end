const { Router } = require("express");
const { postServiceHandler } = require("../Handlers/serviceHandler");
const {filterServis} = require('../Handlers/filterServis');

const serviceRouter = Router();

serviceRouter.post("/", postServiceHandler);

serviceRouter.get('/search', filterServis);

module.exports = serviceRouter;
