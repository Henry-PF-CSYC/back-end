const { Router } = require("express");
const {
    createSubscription,
    //getSubscriptions,
    //getSubscriptionsByUserId,
    //updateSubscriptionById,
    //deleteSubscriptionById,
    //getSubscriptionByEmail,
} = require("../Handlers/subscriptionHandler");
const subscriptionRouter = Router();

//subscriptionRouter.get("/", getSubscriptions);
//subscriptionRouter.get("/:id", getSubscriptionsByUserId);
//subscriptionRouter.get("/:email", getSubscriptionByEmail);
//
//subscriptionRouter.put("/:id", updateSubscriptionById);

subscriptionRouter.post("/", createSubscription);

//subscriptionRouter.delete("/:id", deleteSubscriptionById);

module.exports = subscriptionRouter;
