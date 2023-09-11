const { Router } = require("express");
const router = Router();
const userrouter = require('./usersRoutes');

router.use('/users', userrouter);
// router.use('/services', servisRoutes);

module.exports = router;