const { contactAdmin } = require("../Controllers/contactControllers");

const contactAdminHandler = async (req, res) => {
    const { name, phone, message } = req.body;
    try {
        const info = await contactAdmin(name, phone, message);
        res.status(200).json(info);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { contactAdminHandler };
