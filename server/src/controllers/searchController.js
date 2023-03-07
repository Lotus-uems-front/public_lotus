const ApiError = require('../error/ApiError');
const getCompaniesInn = require('../model/getCompaniesInn');
const getMainFormOccupation = require('../model/search/getMainFormOccupation');
const searchCompanyName = require('../model/search/searchCompanyName');
const searchOccupation = require('../model/search/searchOccupation');


/**
 * Обработка поисковых запросов с фильтром
 */
class SearchController {

    /**
     * Поиск компаний по названию
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getCompanyName(req, res, next) {
        const db = req.db;
        const { searchString } = req.body;
        try {
            const innArray = await getCompaniesInn(db);
            const namesCompanies = await searchCompanyName(db, innArray, searchString);
            console.log(`search string::: `, searchString); // test

            res.json(namesCompanies)
        } catch (err) {
            console.log('Ошибка при поиске названия компании: ', err);
            return next(ApiError.badRequest(`Ошибка при поиске названия компании`));
        }
    }

    /**
     * Поиск компаний по виду деятельности
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getCompanyOccupation(req, res, next) {
        const db = req.db;
        const { occupation } = req.body;
        try {
            //todo: поиск компаний по виду деятельности
            console.log(`OCCUPATION:::: `, occupation); //test
            const innArr = await getCompaniesInn(db);
            const arrayInn = await searchOccupation(db, innArr, occupation)
            const companyOccupation = await getMainFormOccupation(db, arrayInn);

            res.json(companyOccupation)
        } catch (err) {
            console.log('Ошибка при поиске вида деятельности компании: ', err);
            return next(ApiError.badRequest(`Ошибка при поиске вида деятельности компании`));
        }
    }

}

module.exports = new SearchController();