const {
    createPackSubscriptionController,
    deletePackSubscriptionsController,
    restorePackSubscriptionController,
    getPackSubscriptionsController,
} = require("../Controllers/packSubscription/createPackSubscriptionController.js");
const getPackSubscriptions = async (req, res) => {
    try {
        const { statusCode, message, packs, subscriptions } =
            await getPackSubscriptionsController(req);

        res.status(statusCode).json({ message, packs, subscriptions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const createPackSubscription = async (req, res) => {
    try {
        const { statusCode, message, packs, subscriptions } =
            await createPackSubscriptionController(req);

        res.status(statusCode).json({ message, packs, subscriptions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePackSubscriptions = async (req, res) => {
    try {
        const { statusCode, message, packs, subscriptions } =
            await deletePackSubscriptionsController(req);

        res.status(statusCode).json({ message, packs, subscriptions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const restorePackSubscription = async (req, res) => {
    try {
        const { statusCode, message, packs, subscriptions } =
            await restorePackSubscriptionController(req);

        res.status(statusCode).json({ message, packs, subscriptions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPackSubscription,
    deletePackSubscriptions,
    restorePackSubscription,
    getPackSubscriptions,
};
