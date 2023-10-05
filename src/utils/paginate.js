const paginate = (array, page, size) => {
    const totalPages = Math.ceil(array.length / size);

    const paginated = array.slice((page - 1) * size, page * size);

    return {
        totalPages,
        paginated,
    };
};

module.exports = paginate;
