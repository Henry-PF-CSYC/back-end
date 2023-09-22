const createSubscriptionsController = require("./subscription/createSubscriptionsController");
const getSubscriptionsController = require("./subscription/getSubscriptionsController");
const updateSubscriptionByServiceIdController = require("./subscription/updateSubscriptionByServiceIdController");
const deleteSubscriptionByServiceIdController = require("./subscription/deleteSubscriptionByServiceIdController");
const getSubscriptionByUserEmailController = require("./subscription/getSubscriptionByUserEmailController");
const getSubscriptionsByServiceIdController = require("./subscription/getSubscriptionsByServiceIdController");

module.exports = {
    createSubscriptionsController,
    getSubscriptionsController,
    updateSubscriptionByServiceIdController,
    deleteSubscriptionByServiceIdController,
    getSubscriptionByUserEmailController,
    getSubscriptionsByServiceIdController,
};
