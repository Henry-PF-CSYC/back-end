const { Router } = require("express");
const {
  createSubscription,
  getSubscriptions,
  getSubscriptionsByServiceId,
  updateSubscriptionByServiceId,
  deleteSubscriptions,
  getSubscriptionByUserEmail,
} = require("../Handlers/subscriptionHandler");
const subscriptionRouter = Router();
subscriptionRouter.post("/", createSubscription);
subscriptionRouter.delete("/", deleteSubscriptions);

subscriptionRouter.get("/", getSubscriptions);
subscriptionRouter.get("/user/:user_email", getSubscriptionByUserEmail);
subscriptionRouter.get("/service/:service_id", getSubscriptionsByServiceId);

subscriptionRouter.put("/:service_id", updateSubscriptionByServiceId);

module.exports = subscriptionRouter;


// {
//     "user_email": "facundovies@gmail.com",
//     "service_ids": ["c7f61d1a-3a68-4707-89f3-dc12aed8568c"]
// }// c7f61d1a-3a68-4707-89f3-dc12aed8568c
