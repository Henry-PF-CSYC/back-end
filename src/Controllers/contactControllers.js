const { User } = require("../db");
const mailer = require("nodemailer");
require("dotenv").config();
console.log("process.env.EMAIL_APP: ", process.env.EMAIL_APP);
console.log("process.env.EMAIL_PASSWORD: ", process.env.EMAIL_PASSWORD);
const contactAdmin = async (name, phone, message) => {
    try {
        const admin = await User.findOne({
            where: {
                role: "admin",
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
                console.log("error: ", error);
                throw error;
            });
        return info;
    } catch (error) {
        throw error;
    }
};

module.exports = { contactAdmin };
