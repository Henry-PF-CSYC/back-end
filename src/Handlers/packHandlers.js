const {
    createPackController,
    deletePackController,
    restorePackController,
    updatePackController,
    getPacksController,
    getPackByIdController,
    createArrayPacksController,
    deletePackArrayController,
} = require("../Controllers/packController.js");

const createPack = async (req, res) => {
    try {
        const { message, pack } = await createPackController(req);
        res.status(201).json({ message, pack });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createArrayPacks = async (req, res) => {
    try {
        const { message, packs } = await createArrayPacksController(req);
        res.status(201).json({ message, packs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePack = async (req, res) => {
    try {
        const { message, pack } = await deletePackController(req);
        res.status(200).json({ message, pack });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePackArray = async (req, res) => {
    try {
        const { message, packs } = await deletePackArrayController(req);
        res.status(200).json({ message, packs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const restorePack = async (req, res) => {
    try {
        const { message, pack } = await restorePackController(req);
        res.status(200).json({ message, pack });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePack = async (req, res) => {
    try {
        const { message, pack } = await updatePackController(req);
        res.status(200).json({ message, pack });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPacks = async (req, res) => {
    try {
        const { message, packs } = await getPacksController(req);
        res.status(200).json({ message, packs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPackById = async (req, res) => {
    try {
        const pack = await getPackByIdController(req);
        res.status(200).json(pack);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getPacks,
    createPack,
    getPackById,
    updatePack,
    restorePack,
    deletePack,
    createArrayPacks,
    deletePackArray,
};
