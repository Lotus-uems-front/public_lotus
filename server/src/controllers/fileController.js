const ApiError = require('../error/ApiError');
const getIcon = require('../model/file/getIcon');


class FileController {

    /**
     * Загружаем иконку, аватарку
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getIcon(req, res, next) {
        const { fileName } = req.body;
        try {
            const file = await getIcon(req, res, fileName)
            res.send(file)

        } catch (err) {
            console.log(Ошибка`Ошибка получения иконки: `, err);
            return next(ApiError.badRequest(`Ошибка получения иконки`));
        }
    }


}

module.exports = new FileController()