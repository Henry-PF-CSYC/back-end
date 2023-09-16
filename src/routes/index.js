const { Router } = require('express');
const router = Router();
const userrouter = require('./usersRoutes');

const serviceRouter= require("./serviceRoutes")
const reviewRouter = require('./reviewRoutes');

router.use('/users', userrouter);
router.use('/services', serviceRouter);
router.use('/reviews', reviewRouter);

module.exports = router;
