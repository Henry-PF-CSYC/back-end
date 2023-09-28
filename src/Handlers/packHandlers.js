const { createPackController } = require("../Controllers/packController.js");

const createPack = async (req, res) => {
    try {
        await createPackController(req);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPack,
};
