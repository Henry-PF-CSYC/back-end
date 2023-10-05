const { Router } = require("express");
const packSubscriptionRouter = Router();
const {
    createPackSubscription,
    deletePackSubscriptions,
    restorePackSubscription,
    getPackSubscriptions,
    getPackSubscriptionsByUser,
    getPackSubscriptionsByPack,
    updatePackSubscriptionByUser, //change due_date to a month after the previous due_date at 8:00
} = require("../Handlers/packSubscriptionHandlers.js");
//byArrayOfPackIds
//takes
// {
// 	"user_email": "user@email.do"
// 	"pack_ids": ["uuidv4", "uuidv4", "uuidv4"]
// }
packSubscriptionRouter.post("/", createPackSubscription);
packSubscriptionRouter.delete("/", deletePackSubscriptions);
packSubscriptionRouter.post("/restore", restorePackSubscription);

packSubscriptionRouter.get("/", getPackSubscriptions); //takes type=all to get all packSubscriptions, type=deleted to get deleted packSubscriptions, type=active to get active packSubscriptions

//byUserEmail
packSubscriptionRouter.get("/:user_email", getPackSubscriptionsByUser);
//byPackId
packSubscriptionRouter.get("/:pack_id", getPackSubscriptionsByPack);

//updateByUser(change due_date to a month after the previous due_date at 8:00)
packSubscriptionRouter.put("/", updatePackSubscriptionByUser); //takes object with user_email, pack_ids: []

module.exports = packSubscriptionRouter;

//packSubscriptionRouter.get("/", getPackSubscriptions); //takes type=all to get all packSubscriptions, type=deleted to get deleted packSubscriptions, type=active to get active packSubscriptions
//packSubscriptionRouter.get("/:id", getPackSubscriptionById);
//packSubscriptionRouter.get("/user/:user_email", getPackSubscriptionByUserEmail);
//packSubscriptionRouter.get("/pack/:pack_id", getPackSubscriptionByPackId);
//
//
//
//packSubscriptionRouter.put("/:id", updatePackSubscription); //changes due_date to a month after the previous due_date at 8:00 //takes object with user_email, pack_ids: []
//packSubscriptionRouter.patch("/:id", restorePackSubscription); //just restores the packSubscription
//packSubscriptionRouter.delete("/:id", deletePackSubscription); //takes type=hard to delete permanently, else soft delete
