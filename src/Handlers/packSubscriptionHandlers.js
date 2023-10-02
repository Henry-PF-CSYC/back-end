const {
    createPackSubscriptionController,
    deletePackSubscriptionsController,
    restorePackSubscriptionController,
    getPackSubscriptionsController,
    getPackSubscriptionsByUserController,
    getPackSubscriptionsByPackController,
    updatePackSubscriptionByUserController, //change due_date to a month after the previous due_date at 8:00
} = require("../Controllers/packSubscription/createPackSubscriptionController.js");
const getPackSubscriptions = async (req, res) => {
    try {
        const { statusCode, message, subscriptions } =
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

const getPackSubscriptionsByUser = async (req, res) => {
    try {
        const { statusCode, message, subscriptions } =
            await getPackSubscriptionsByUserController(req);

        res.status(statusCode).json({ message, packs, subscriptions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPackSubscriptionsByPack = async (req, res) => {
    try {
        const { statusCode, message, subscriptions } =
            await getPackSubscriptionsByPackController(req);

        res.status(statusCode).json({ message, packs, subscriptions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePackSubscriptionByUser = async (req, res) => {
    try {
        const { statusCode, message, packs, subscriptions } =
            await updatePackSubscriptionByUserController(req);

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
    getPackSubscriptionsByUser,
    getPackSubscriptionsByPack,
    updatePackSubscriptionByUser, //change due_date to a month after the previous due_date at 8:00
};
