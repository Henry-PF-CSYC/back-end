const { Router } = require("express");
const {
    createSubscription,
    getSubscriptions,
    getSubscriptionsByServiceId,
    updateSubscriptionByServiceId,
    deleteSubscriptionByServiceId,
    getSubscriptionByUserEmail,
} = require("../Handlers/subscriptionHandler");
const subscriptionRouter = Router();
subscriptionRouter.post("/", createSubscription);
subscriptionRouter.get("/", getSubscriptions);
subscriptionRouter.get("/user/:user_email", getSubscriptionByUserEmail);
subscriptionRouter.get("/service/:service_id", getSubscriptionsByServiceId);

subscriptionRouter.put("/:service_id", updateSubscriptionByServiceId);
subscriptionRouter.delete("/:service_id", deleteSubscriptionByServiceId);

module.exports = subscriptionRouter;
