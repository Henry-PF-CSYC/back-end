const { Router } = require("express");
const { creatUser, getAllUsers } = require("../Handlers/userHandlers");

const userrouter = Router();

userrouter.get('/', getAllUsers);

userrouter.post("/", creatUser);

// userrouter.put('/', putUsers);

// userrouter.delete('/', deleteUsers);

module.exports = userrouter;
