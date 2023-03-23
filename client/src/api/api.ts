import axios from 'axios'

const port = '5000'

// export const URL: string = `http://localhost:${port}` // для домашнего использования
export const URL: string = `https://test.public.lotus-uems.ru` // для тестового сервера


const baseURL = `${URL}/api/company/get_all_data`
const searchByCompanyNameURL = `${URL}/api/search/search_name` // поиск компаний по названию
const searchOccupationURL = `${URL}/api/search/search_occupation` // поиск по виду деятельности
const getIconURL = `${URL}/api/file/get-icon` // получение иконки

const headers = { "Content-Type": "application/json" }


export const companiesDataApi = {

    /**
     * Получаем все данные компании по ИНН
     * @param {String} inn ИНН компании
     * @returns {Array}
     */
    async getCompanyData(inn: string) {
        try {
            const response = await axios.post(baseURL, { inn })
            const data = await response.data
            return data
        } catch (err) {
            console.log(`Ошибка в api.ts: `, err);
            return []
        }

    },

    /**
     * Поиск по названию компании
     * @param {Object} dataSearch строка поиска
     * @returns {Array} возвращает массив объектов MAIN
     */
    async searchByCompanyName(dataSearch: Object) {
        try {
            const response = await axios.post(searchByCompanyNameURL, { dataSearch })
            const data = await response.data.namesCompanies
            // console.log(`DATA::: `, response); // test

            return data
        } catch (err) {
            console.log(`Ошибка в api.ts: `, err);
            return []
        }
    },

    async getCompaniesLengthName(dataSearch: Object) {
        try {
            const response = await axios.post(searchByCompanyNameURL, { dataSearch })
            const length = await response.data
            console.log(`DATA::: `, response); // test
            return length
        } catch (err) {
            console.log(`Ошибка в api.ts: `, err);
            return []
        }
    },

    /**
     * Поиск по виду деятельности
     * @param {Object} occupation строка поиска
     * @returns {Array} возвращает массив объектов MAIN
     */

    // {companyOccupation: Array(10), lengthArr: 15}
    async searchOccupation(occupation: Object) {
        try {
            const response = await axios.post(searchOccupationURL, { occupation })
            const data = await response.data.companyOccupation
            const length = await response.data.lengthArr
            // console.log(`DATA::: `, response.data); // test
            return {
                data,
                length
            }
        } catch (err) {
            console.log(`Ошибка в api.ts: `, err);
            return []
        }

    },

    async getCompaniesLength(occupation: Object) {
        try {
            const response = await axios.post(searchOccupationURL, { occupation })
            const length = await response.data.lengthArr
            console.log(`DATA::: `, response); // test
            return length
        } catch (err) {
            console.log(`Ошибка в api.ts: `, err);
            return []
        }
    },


    /**
     * Получение иконки
     * @param {string} fileName 
     * @returns 
     */
    async getIcon(fileName: string) {
        try {
            const response = await axios.post(getIconURL, { fileName }, { responseType: 'blob' });
            const data = global.URL.createObjectURL(response.data);
            return data;
        } catch (error) {
            console.error('Ошибка в api.ts:', error);
            return null;
        }
    },

}
