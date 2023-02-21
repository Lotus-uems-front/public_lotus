const ApiError = require('../error/ApiError');
const allCompany = require('../model/company/allCompany');


/**
 * Получение данных о предприятии
 */
class CompanyController {

    /**
     * Возвращает массив объектов всех компаний: 
     * [{ city: город, companyName: название компании, inn: ИНН }]
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns {Array} [{city: город, companyName: название компании, inn: ИНН}]
     */
    async getAllCompanies(req, res, next) {
        const db = req.db;
        try {
            console.log(`Формирование массива всех компаний`); // test
            const result = await allCompany(db);
            res.json(result)
        } catch (err) {
            console.log('Ошибка получения массива компаний: ', err);
            return next(ApiError.badRequest(`Ошибка получения массива компаний`));
        }


    }

    /**
     * Возвращает анкетные данные одной выбранной компании
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getDataCompany(req, res, next) {

    }

}

module.exports = new CompanyController();