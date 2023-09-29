const { Router } = require('express');
const {
  handleGetReviewsByServiceId,
  handleGetReviewsByUserId,
  handlePostReview,
  getAllReviews,
  handleReviewById,
  handleDeleteReview
} = require('../Handlers/reviewHandler');
const review = require('../models/review');

const reviewRouter = Router();
reviewRouter.post("/", handlePostReview)
reviewRouter.get("/", getAllReviews )
reviewRouter.get("/review/:id", handleReviewById)
reviewRouter.get('/:serviceId', handleGetReviewsByServiceId);
reviewRouter.get('/byUser/:userId', handleGetReviewsByUserId);
reviewRouter.delete("/:id", handleDeleteReview)
module.exports = reviewRouter;
