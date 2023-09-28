const { Router } = require("express");
const packRouter = Router();
const { createPack } = require("../handlers/packHandlers.js");

packRouter.post("/", createPack);

module.exports = packRouter;
