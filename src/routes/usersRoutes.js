const { Router } = require("express");
const { creatUser } = require("../Handlers/userHandlers");

const userrouter = Router();

// userrouter.get('/', getAllUsers);

userrouter.post("/", creatUser);

// userrouter.put('/', putUsers);

// userrouter.delete('/', deleteUsers);

module.exports = userrouter;