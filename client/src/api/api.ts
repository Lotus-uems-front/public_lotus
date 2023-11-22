import axios from 'axios'

const port = '5000'

// export const URL: string = `http://localhost:${port}` // для домашнего использования
export const URL: string = `https://test.public.lotus-uems.ru` // для тестового сервера!
// export const URL: string = `https://public.lotus-uems.ru` // для production сервера


const baseURL = `${URL}/api/company/get_all_data`
const searchByCompanyNameURL = `${URL}/api/search/search_name` // поиск компаний по названию
const searchOccupationURL = `${URL}/api/search/search_occupation` // поиск по виду деятельности
const getIconURL = `${URL}/api/file/get-icon` // получение иконки
// const fileUrl = `${URL}/home/leo/uems-uploads/`
const fileUrl = `${URL}/api/file/get-icon`
const filterURL = `${URL}/api/search/filter` // глубокий поиск по фильтру


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

    async getCitiesData() {
        try {
            const response = await axios.get(`${URL}/api/company/get_all_company`) // https://public.lotus-uems.ru/api/company/get_all_company
            return response.data
        } catch (err) {
            throw err
        }
    },

    async searchByCompanyName(dataSearch: Object) {
        try {
            const response = await axios.post(searchByCompanyNameURL, { dataSearch })
            const data = await response.data
            // console.log(`DATA::: `, response); // test
            return data
        } catch (err) {
            console.log(`Ошибка в api.ts: `, err);
            return []
        }
    },

    async searchOccupation(occupation: Object) {
        try {
            const response = await axios.post(searchOccupationURL, { occupation })
            const data = await response.data
            // console.log(`DATA::: `, response.data); // test
            return data
        } catch (err) {
            console.log(`Ошибка в api.ts: `, err);
            return []
        }

    },

    async getCompaniesLength(occupation: Object) {
        try {
            const response = await axios.post(searchOccupationURL, { occupation })
            const length = await response.data.lengthArr
            // console.log(`DATA::: `, response); // test
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

    // /home/${user}/uems-uploads/Fifteen_-${login}_-${id}_-${fileName}
    /**
     * Получение файла из DB
     * @param fileName 
     * @returns 
     */
    async getFile(fileName: string) {
        try {
            const response = await axios.post(fileUrl, { fileName }, { responseType: 'blob' });
            const data = global.URL.createObjectURL(response.data);

            return data;
        } catch (error) {
            console.error('Ошибка в api.ts:', error);
            return null;
        }
    },

    /**
     * Получение массива ИНН компаний согласно фильтра
     * @param {Object} filterData  объект поиска
     * @returns {Array} data массив ИНН
     */
    async getFilterData(filterData: Object) {
        try {
            console.log(`FILTER::: `, filterData); // test

            const response = await axios.post(filterURL, { filterData })
            const data = await response.data
            // console.log(`DATA::: `, response.data); // test
            return data
        } catch (err) {
            console.log(`Ошибка в api.ts, поиск по фильтру: `, err);
            return []
        }
    },

}
