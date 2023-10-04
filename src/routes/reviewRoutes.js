const { Router } = require("express");
const {
    handleGetReviewsByServiceId,
    handleGetReviewsByUserId,
    handlePostReview,
    getAllReviews,
    handleReviewById,
    handleDeleteReview,
    getByUserAndService,
} = require("../Handlers/reviewHandler");

const reviewRouter = Router();
reviewRouter.post("/", handlePostReview);
reviewRouter.get("/", getAllReviews);
reviewRouter.get("/user_service/:user_email", getByUserAndService); //takes query service_id
reviewRouter.delete("/:id", handleDeleteReview);
reviewRouter.get("/review/:id", handleReviewById);
reviewRouter.get("/:serviceId", handleGetReviewsByServiceId);
reviewRouter.get("/byUser/:userId", handleGetReviewsByUserId);
module.exports = reviewRouter;
