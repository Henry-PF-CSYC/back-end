const {
    getNoticesController,
    postNoticeController,
    deleteNoticeController,
    putNoticeController,
} = require("../Controllers/noticeController.js");

const getNotices = async (req, res) => {
    try {
        const notices = await getNoticesController();
        res.status(200).json(notices);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const postNotice = async (req, res) => {
    try {
        const notice = await postNoticeController(req.body);
        res.status(200).json(notice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteNotice = async (req, res) => {
    try {
        const notice = await deleteNoticeController(req.params.id);
        res.status(200).json(notice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const putNotice = async (req, res) => {
    try {
        const notice = await putNoticeController(req.params.id, req.body);
        res.status(200).json(notice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getNotices,
    postNotice,
    deleteNotice,
    putNotice,
};
