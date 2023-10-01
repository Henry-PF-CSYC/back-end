const { Subscription, User, Pack, Services } = require("../../db");

const createPackSubscriptionController = async (req) => {
    /* 
    {
	"user_email": "jemc1598@gmail.com",
	"pack_ids": [
		"c455b048-d48e-4aa4-b8c2-dba64425f905",
		"000c3346-a84f-4e1a-866f-fd702e297108"
	]
}
    */
    const { user_email, pack_ids } = req.body;

    //find user, throw error if not found
    //find packs, push error if not found, push error if pack is not active, push pack to array
    //create subscription with with through_pack = true, due_date = today + 1 month, status = activa, user_id = user.id, service_id = pack.id, service_name = pack.name, user_service_pair = user.id + pack.id, pack_id = pack.id
    //return subscription array
    const user = await User.findOne({
        where: {
            email: user_email,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const subscriptions = [];
    const due_date = new Date(); //a month from now at 2000
    due_date.setMonth(due_date.getMonth() + 1);
    due_date.setHours(20, 0, 0, 0);
    const packs = [];

    for (let i = 0; i < pack_ids.length; i++) {
        const pack = await Pack.findOne({
            where: {
                id: pack_ids[i],
            },
        });
        if (!pack) {
            packs.push({
                error: `Pack ${pack_ids[i]} not found`,
            });
            continue;
        }
        packs.push(pack);
        console.log("loop", user);
        subscriptions.push(
            await subscriptionToPackCreator(user, pack, due_date)
        );
    }

    return {
        statusCode: 200,
        message: "Subscriptions created",
        packs,
        subscriptions,
    };
};

const deletePackSubscriptionsController = async (req) => {
    /* 
    {
	"user_email": "jemc1598@gmail.com",
	"pack_ids": [
		"c455b048-d48e-4aa4-b8c2-dba64425f905",
		"000c3346-a84f-4e1a-866f-fd702e297108"
	]
}
    */
    const { user_email, pack_ids } = req.body;
    const { type } = req.query;
    const user = await User.findOne({
        where: {
            email: user_email,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }
    const packs = [];

    for (let i = 0; i < pack_ids.length; i++) {
        const pack = await Pack.findOne({
            where: {
                id: pack_ids[i],
            },
        });
        if (!pack) {
            packs.push({
                error: `Pack ${pack_ids[i]} not found`,
            });
            continue;
        }
        packs.push(pack);
    }
    //find subscriptions with user_id = user.id, pack_id = pack.id, through_pack = true
    //delete subscriptions
    //return subscription array
    const subscriptions = [];
    for (let i = 0; i < packs.length; i++) {
        const pack = packs[i];
        const packSubscriptions = await Subscription.findAll({
            where: {
                user_id: user.email,
                pack_id: pack.id,
                through_pack: true,
            },
        });

        for (let j = 0; j < packSubscriptions.length; j++) {
            const subscription = packSubscriptions[j];
            subscriptions.push(subscription);
            await subscriptionDestroyer(subscription, type);
        }
    }

    return {
        statusCode: 200,
        message: "Subscriptions deleted",
        packs,
        subscriptions,
    };
};

const subscriptionDestroyer = async (subscription, type) => {
    if (type === "soft") {
        await subscription.destroy();
    } else {
        await subscription.destroy({ force: true });
    }
};

const subscriptionToPackCreator = async (user, pack, due_date) => {
    console.log(user);
    const subscriptions = [];

    const services = await pack.getServices();
    for (let i = 0; i < services.length; i++) {
        const { subscription, created } = await Subscription.findOrCreate({
            where: {
                user_service_pair: `${user.email}-${services[i].id}`,
            },
            defaults: {
                due_date,
                status: "activa",
                user_id: user.email,
                service_id: services[i].id,
                service_name: services[i].name,
                user_service_pair: `${user.email}-${services[i].id}`,
                through_pack: true,
                pack_id: pack.id,
                due_payment: services[i].price * (1 - pack.discount / 100),
            },
        });
        if (!created) {
            subscriptions.push({
                error: `Subscription to ${services[i].name} already exists`,
            });
        } else {
            subscriptions.push(subscription);
        }
    }

    return subscriptions;
};
module.exports = {
    createPackSubscriptionController,
    deletePackSubscriptionsController,
};
