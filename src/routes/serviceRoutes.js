const { Router } = require("express");

const {
    postServiceHandler,
    getServicesFilteredAndPaginated,
    getServiceById,
    postArrayServiceHandler,
    updateServiceHandler,
    deleteServiceHandler,
    deleteArrayServiceHandler,
    restoreServiceHandler,
    restoreArrayServiceHandler,
} = require("../Handlers/serviceHandler");

const serviceRouter = Router();
serviceRouter.get("/", getServicesFilteredAndPaginated);
serviceRouter.get("/:id", getServiceById);

serviceRouter.post("/", postServiceHandler);
serviceRouter.post("/array", postArrayServiceHandler);

serviceRouter.put("/:id", updateServiceHandler);

serviceRouter.delete("/delete/:id", deleteServiceHandler);
serviceRouter.put("/restore/:id", restoreServiceHandler);

serviceRouter.post("/delete/array", deleteArrayServiceHandler);
serviceRouter.post("/restore/array", restoreArrayServiceHandler);

module.exports = serviceRouter;
