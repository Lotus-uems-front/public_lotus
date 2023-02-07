const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {

    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.maessage })
    }
    return res.status(500).json({ message: 'Ошибка не учтена!!!' })
}