const { Router } = require('express');
const {
  handleGetReviewsByServiceId,
  handleGetReviewsByUserId,
} = require('../Handlers/reviewHandler');

const reviewRouter = Router();

reviewRouter.get('/:serviceId', handleGetReviewsByServiceId);
reviewRouter.get('/byUser/:userId', handleGetReviewsByUserId);

module.exports = reviewRouter;
