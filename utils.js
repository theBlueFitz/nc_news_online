exports.sanitiseOrderQuery = (order) => {
    if (order === undefined || order === 'DESC') {
        order = 'DESC';
        return order;
    } else if (order === 'ASC') {
        return order;
    } else {
        return Promise.reject({status:400, msg: 'Invalid order query'})
    }
}