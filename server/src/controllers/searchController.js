const ApiError = require('../error/ApiError');
const getFilterData = require('../model/filter/getFilterData');
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
        try {
            if (!req.body.dataSearch) {

            }
            const { searchString, page } = req.body.dataSearch;
            console.log(`PG >>> `, page); // test

            const innArray = await getCompaniesInn(db);
            let namesCompanies = await searchCompanyName(db, innArray, searchString);
            console.log(`search string::: `, searchString); // test
            const lengthArr = namesCompanies.length;
            console.log(`LENGTH:::: ${lengthArr}`); // test

            if (page && Number(page) > 0) {
                console.log(`PAGES:::: `, Number(page)); // test
                namesCompanies = doPagination(namesCompanies, page);
            }

            res.json({ namesCompanies: namesCompanies, lengthArr: lengthArr })
            // res.json(namesCompanies)
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
        try {
            if (!req.body.occupation) {
                throw new Error('Нет occupation объекта')
            }
            const { searchParamOccupation, page } = req.body.occupation;
            console.log(`PG >>> `, page); // test

            console.log(`OCCUPATION:::: `, searchParamOccupation); //test
            const innArr = await getCompaniesInn(db);
            const arrayInn = await searchOccupation(db, innArr, searchParamOccupation)
            let companyOccupation = await getMainFormOccupation(db, arrayInn);
            const lengthArr = companyOccupation.length

            if (page && Number(page) > 0) {
                console.log(`PAGES:::: `, Number(page)); // test
                companyOccupation = doPagination(companyOccupation, page);
            }

            res.json({ companyOccupation: companyOccupation, lengthArr: lengthArr })
        } catch (err) {
            console.log('Ошибка при поиске вида деятельности компании: ', err);
            return next(ApiError.badRequest(`Ошибка при поиске вида деятельности компании`));
        }
    }

    /**
     * Получаем массив ИНН компаний соответсвующих фильтру
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getCompanyFilter(req, res, next) {
        const db = req.db;
        try {
            if (!req.body.filterData) {
                throw new Error('Нет объекта filterData')
            }
            const filterData = req.body.filterData;
            // const { equipment, information, subequipment } = req.body.filterData
            const innArray = await getCompaniesInn(db);
            const result = await getFilterData(db, innArray, filterData)

            console.log(`RESULT INN:::: `, result);
            res.json({ inn: result })
        } catch (err) {
            console.log('Ошибка при поиске данный по фильтру: ', err);
            return next(ApiError.badRequest(`Ошибка при поиске данный по фильтру`));
        }
    }

}

module.exports = new SearchController();