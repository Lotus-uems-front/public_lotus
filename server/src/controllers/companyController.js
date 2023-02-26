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
        const db = req.db;
        const { inn, id } = req.body;
        try {
            console.log(`body:::: ${inn} --- ${id} === `); // test

            if (!inn || !id) {
                return next(ApiError.badRequest(`Не указана коллекция или ID документа`));
            }

            const result = await db.collection(String(inn))
                .findOne({ _id: id })

            res.json(result)

        } catch (err) {
            console.log('Ошибка при получении данных компании ONE: ', err);
            return next(ApiError.badRequest(`Ошибка при получении данных компании`));
        }
    }

    /**
     * Возвращает массив всех объектов из указанной колекции
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAllDataCompany(req, res, next) {
        const db = req.db;
        const { inn } = req.body;
        try {
            console.log(`INN::: `, inn); // test

            if (!inn) {
                return next(ApiError.badRequest(`Не указана коллекция`));
            }

            const result = await db.collection(String(inn))
                .find({}).toArray()

            res.json(result)

        } catch (err) {
            console.log('Ошибка при получении данных компании ALL: ', err);
            return next(ApiError.badRequest(`Ошибка при получении данных компании ALL`));
        }
    }

}

module.exports = new CompanyController();