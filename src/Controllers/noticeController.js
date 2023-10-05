const { Notice } = require("../db");

const getNoticesController = async () => {
    const notices = await Notice.findAll();
    return notices;
};

const postNoticeController = async (notice) => {
    const newNotice = await Notice.create(notice);
    return newNotice;
};

const deleteNoticeController = async (id) => {
    const notice = await Notice.destroy({
        where: { id: id },
    });
    return notice;
};

const putNoticeController = async (id, notice) => {
    const noticeUpdated = await Notice.update(notice, {
        where: { id: id },
    });
    return noticeUpdated;
};

module.exports = {
    getNoticesController,
    postNoticeController,
    deleteNoticeController,
    putNoticeController,
};
