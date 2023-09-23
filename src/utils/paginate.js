const paginate = (array, page, size) => {
    const offset = page * size - size;
    return array.slice(offset, offset + size);
};

module.exports = paginate;
