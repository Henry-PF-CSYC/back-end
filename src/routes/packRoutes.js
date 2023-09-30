const { Router } = require("express");
const packRouter = Router();
const {
    getPacks,
    createPack,
    createArrayPacks,
    deletePackArray,
    getPackById,
    updatePack,
    restorePack,
    deletePack,
} = require("../Handlers/packHandlers");

packRouter.get("/", getPacks); //takes type=all to get all packs, type=deleted to get deleted packs, type=active to get active packs
packRouter.post("/", createPack);
packRouter.post("/array", createArrayPacks);
packRouter.delete("/array", deletePackArray);

packRouter.get("/:id", getPackById);
packRouter.put("/:id", updatePack); //takes object
packRouter.patch("/:id", restorePack);
packRouter.delete("/:id", deletePack); //takes type=hard to delete permanently, else soft delete

module.exports = packRouter;
