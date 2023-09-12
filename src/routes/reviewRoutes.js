const { Router } = require('express');
const { handleGetReviewsByServiceId } = require('../Handlers/reviewHandler');

const reviewRouter = Router();

reviewRouter.get('/:serviceId', handleGetReviewsByServiceId);

module.exports = reviewRouter;
