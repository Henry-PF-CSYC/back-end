const { User, Service, Subscription } = require("../../db");
const mailer = require("nodemailer");
require("dotenv").config();

const createSubscriptionsController = async (user_email, service_ids) => {
    try {
        const user = await User.findOne({
            where: { email: user_email },
        });
        if (!user) {
            return {
                statusCode: 404,
                message: "User not found",
            };
        }
        const services = await Service.findAll({
            where: { id: service_ids },
        });
        if (!services) {
            return {
                statusCode: 404,
                message: "Services not found",
            };
        }
        const user_service_pairs = [];
        const subscriptions = [];
        let due_date = new Date(); //set due next month at 20:00
        due_date.setMonth(due_date.getMonth() + 1);
        due_date.setHours(20);
        due_date.setMinutes(0);
        due_date.setSeconds(0);
        due_date.setMilliseconds(0);

        services.forEach((service) => {
            user_service_pairs.push(`${user.email}-${service.id}`);
            subscriptions.push({
                due_date,
                status: "activa",
                user_id: user.email,
                service_id: service.id,
                service_name: service.name,
                user_service_pair: `${user.email}-${service.id}`,
                deletedAt: null,
            });
        });
        const foundCreatedOrUpdatedSubscriptions =
            await Subscription.bulkCreate(subscriptions, {
                updateOnDuplicate: ["due_date", "status", "deletedAt"],
            });
        if (!foundCreatedOrUpdatedSubscriptions) {
            return {
                statusCode: 500,
                message: "Error creating subscriptions",
            };
        }

        // Send email notification
        await notificationSendHelper(user, services, due_date);
        //pull out the id of the created subscriptions
        const subscription_ids = foundCreatedOrUpdatedSubscriptions.map(
            (subscription) => subscription.id
        );
        //find the created subscriptions and pull the description attribute of each service
        const foundSubscriptions = await Subscription.findAll({
            where: { id: subscription_ids },
            attributes: ["id", "due_date", "status", "user_service_pair"],
            include: [
                {
                    model: Service,
                    attributes: ["description", "name", "image"],
                },
            ],
        });
        return {
            statusCode: 201,
            message: "Subscriptions created or updated",
            subscriptions: foundSubscriptions,
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
        };
    }
};

const notificationSendHelper = async (user, services, due_date) => {
    const transporter = mailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_PASSWORD,
            authMethod: "PLAIN", // or "XOAUTH2"
        },
    });

    const html = `<h1>Estimad@ ${user.name}</h1>
            <h2>Las siguientes suscripciones han sido creadas o actualizadas:</h2>
            <p>Fecha de vencimiento: ${due_date}</p>
            <ul>
            ${services
                .map(
                    (service) => `
                <li>
                    ${service.name} 
                </li>
            `
                )
                .join("")}
        </ul>`;
    const mailOptions = {
        from: process.env.EMAIL_APP,
        to: user.email,
        subject: "Notificación de Suscripción",
        html: html,
    };
    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = createSubscriptionsController;
