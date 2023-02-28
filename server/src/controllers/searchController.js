const ApiError = require('../error/ApiError');
const getCompaniesInn = require('../model/getCompaniesInn');
const searchCompanyName = require('../model/search/searchCompanyName');


/**
 * Обработка поисковых запросов с фильтром
 */
class SearchController {

    async getCompanyName(req, res, next) {
        const db = req.db;
        const { data } = req.body;
        try {
            const innArray = await getCompaniesInn(db);
            const namesCompanies = await searchCompanyName(db, innArray, data);

            res.json(namesCompanies)
        } catch (err) {
            console.log('Ошибка при поиске названия компании: ', err);
            return next(ApiError.badRequest(`Ошибка при поиске названия компании`));
        }

    }

    async getCompanyOccupation(req, res, next) {
        const db = req.db;
        const { data } = req.body;
        try {
            //todo: поиск компаний по виду деятельности

            res.json({ server: 'поиск компании по виду деятельности' })
        } catch (err) {
            console.log('Ошибка при поиске вида деятельности компании: ', err);
            return next(ApiError.badRequest(`Ошибка при поиске вида деятельности компании`));
        }

    }

}

module.exports = new SearchController();