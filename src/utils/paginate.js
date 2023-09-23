const paginate = (array, page, size) => {
    const sliced = array.slice((page - 1) * size, page * size);

    return sliced;
};

module.exports = paginate;
