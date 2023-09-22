const { User } = require("../db");
const mailer = require("nodemailer");
require("dotenv").config();
const contactAdmin = async (name, phone, message) => {
    try {
        const admin = await User.findOne({
            where: {
                role: "contact_admin",
            },
        });
        const email = admin.email;

        if (!email || email === "" || email === undefined || email === null) {
            throw new Error("Admin not found");
        }

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
        const html = `<h1>Nombre: ${name}</h1>
            <h2>Telefono: ${phone}</h2>
            <h3>Mensaje: ${message}</h3>`;

        const mailOptions = {
            from: process.env.EMAIL_APP,
            to: email,
            subject: "Contacto de usuario",
            html: html,
        };
        //send email with error handling
        const info = await transporter
            .sendMail({
                ...mailOptions,
            })
            .catch((error) => {
                throw error;
            });
        return info;
    } catch (error) {
        throw error;
    }
};
const setContactAdminController = async (admin_email) => {
    try {
        const admin = await User.findOne({
            where: {
                email: admin_email,
                role: "admin",
            },
        });
        if (!admin) {
            throw new Error("Admin not found");
        }
        admin.role = "contact_admin";
        await admin.save();
        return admin;
    } catch (error) {
        throw error;
    }
};
module.exports = { contactAdmin, setContactAdminController };
