const { Router } = require("express");

const {
    postServiceHandler,
    getNonDeleted,
    getServiceById,
    postArrayServiceHandler,
    getAllServices,
    updateServiceHandler,
    deleteServiceHandler,
    deleteArrayServiceHandler,
    restoreServiceHandler,
    restoreArrayServiceHandler,
} = require("../Handlers/serviceHandler");

const serviceRouter = Router();
serviceRouter.get("/", getNonDeleted);
serviceRouter.get("/all", getAllServices);
serviceRouter.get("/:id", getServiceById);

serviceRouter.post("/", postServiceHandler);
serviceRouter.post("/array", postArrayServiceHandler);

serviceRouter.put("/:id", updateServiceHandler);

serviceRouter.delete("/delete/:id", deleteServiceHandler);
serviceRouter.put("/restore/:id", restoreServiceHandler);

serviceRouter.delete("/delete/array", deleteArrayServiceHandler);
serviceRouter.put("/restore/array", restoreArrayServiceHandler);

module.exports = serviceRouter;
