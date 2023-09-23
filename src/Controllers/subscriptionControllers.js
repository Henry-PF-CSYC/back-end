const createSubscriptionsController = require("./subscription/createSubscriptionsController");
const getSubscriptionsController = require("./subscription/getSubscriptionsController");
const updateSubscriptionByIdController = require("./subscription/updateSubscriptionByIdController");
const deleteSubscriptionsController = require("./subscription/deleteSubscriptionsController");
const getSubscriptionByUserEmailController = require("./subscription/getSubscriptionByUserEmailController");
const getSubscriptionsByServiceIdController = require("./subscription/getSubscriptionsByServiceIdController");

module.exports = {
    createSubscriptionsController,
    getSubscriptionsController,
    updateSubscriptionByIdController,
    deleteSubscriptionsController,
    getSubscriptionByUserEmailController,
    getSubscriptionsByServiceIdController,
};
