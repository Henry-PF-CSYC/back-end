const { Router } = require("express");
const packSubscriptionRouter = Router();
const {
    createPackSubscription,
} = require("../Handlers/packSubscriptionHandlers.js");

//packSubscriptionRouter.get("/", getPackSubscriptions); //takes type=all to get all packSubscriptions, type=deleted to get deleted packSubscriptions, type=active to get active packSubscriptions
//packSubscriptionRouter.get("/:id", getPackSubscriptionById);
//packSubscriptionRouter.get("/user/:user_email", getPackSubscriptionByUserEmail);
//packSubscriptionRouter.get("/pack/:pack_id", getPackSubscriptionByPackId);
//
//
//
packSubscriptionRouter.post("/", createPackSubscription); //takes object with user_email, pack_ids: []
//packSubscriptionRouter.put("/:id", updatePackSubscription); //changes due_date to a month after the previous due_date at 8:00 //takes object with user_email, pack_ids: []
//packSubscriptionRouter.patch("/:id", restorePackSubscription); //just restores the packSubscription
//packSubscriptionRouter.delete("/:id", deletePackSubscription); //takes type=hard to delete permanently, else soft delete

module.exports = packSubscriptionRouter;
