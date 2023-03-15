const ApiError = require('../error/ApiError');
const getCompaniesInn = require('../model/getCompaniesInn');
const doPagination = require('../model/search/doPagination');
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
        const { searchString, page } = req.body.dataSearch;
        console.log(`PG >>> `, page); // test
        try {
            const innArray = await getCompaniesInn(db);
            let namesCompanies = await searchCompanyName(db, innArray, searchString);
            console.log(`search string::: `, searchString); // test

            if (page && Number(page) > 0) {
                console.log(`PAGES:::: `, Number(page)); // test
                namesCompanies = doPagination(namesCompanies, page);
            }

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
        const { searchParamOccupation, page } = req.body.occupation;
        console.log(`PG >>> `, page); // test
        try {
            console.log(`OCCUPATION:::: `, searchParamOccupation); //test
            const innArr = await getCompaniesInn(db);
            const arrayInn = await searchOccupation(db, innArr, searchParamOccupation)
            let companyOccupation = await getMainFormOccupation(db, arrayInn);

            if (page && Number(page) > 0) {
                console.log(`PAGES:::: `, Number(page)); // test
                companyOccupation = doPagination(companyOccupation, page);
            }

            res.json(companyOccupation)
        } catch (err) {
            console.log('Ошибка при поиске вида деятельности компании: ', err);
            return next(ApiError.badRequest(`Ошибка при поиске вида деятельности компании`));
        }
    }

}

module.exports = new SearchController();