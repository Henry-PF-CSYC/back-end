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
