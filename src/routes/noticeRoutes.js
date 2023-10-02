const { Router } = require("express");
const router = Router();
const {
    getNotices,
    postNotice,
    deleteNotice,
    putNotice,
} = require("../Handlers/noticeHandler.js");

router.get("/", getNotices); //trae todas las notices
router.post("/", postNotice); //crea una notice, takes title and description
router.delete("/:id", deleteNotice); //borra una notice, takes id
router.put("/:id", putNotice); //modifica una notice, takes id and title and description
