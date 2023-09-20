const { Router } = require("express");
const offerRouter = Router();
const {
  postOfferHandler,
  getOfferHandler,
  getOffersByUser,
  deleteOfferHandler,
  getOfferById
} = require("../Handlers/offerHandler");

offerRouter.get("/", getOfferHandler);
offerRouter.get("/:email", getOffersByUser);
offerRouter.get("/id/:id", getOfferById)
offerRouter.post("/", postOfferHandler);
offerRouter.delete("/:id", deleteOfferHandler);

module.exports = offerRouter;
