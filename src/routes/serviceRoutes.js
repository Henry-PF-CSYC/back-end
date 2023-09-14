const { Router } = require("express");
const { postServiceHandler } = require("../Handlers/serviceHandler");
const {filterservice} = require('../Handlers/filterHandler');

const serviceRouter = Router();

serviceRouter.post("/", postServiceHandler);

serviceRouter.get('/search', filterservice);

module.exports = serviceRouter;
