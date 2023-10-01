const {
    createPackSubscriptionController,
    deletePackSubscriptionsController,
} = require("../Controllers/packSubscription/createPackSubscriptionController.js");

const createPackSubscription = async (req, res) => {
    try {
        const { statusCode, message, packs, subscriptions } =
            createPackSubscriptionController(req);
        res.status(statusCode).json({ message, packs, subscriptions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePackSubscriptions = async (req, res) => {
    try {
        const { statusCode, message, packs, subscriptions } =
            deletePackSubscriptionsController(req);
        res.status(statusCode).json({ message, packs, subscriptions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPackSubscription,
    deletePackSubscriptions,
};
