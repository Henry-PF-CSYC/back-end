const paginate = (array, page = 1, size = 2) => {
    const offset = page * size - size;
    return array.slice(offset, offset + size);
};

module.exports = paginate;
