import axios from 'axios'

const port = '5000'
// const url = `http://localhost:${port}` // для домашнего использования
const url = `https://test.public.lotus-uems.ru` // для тестового сервера

const baseURL = `${url}/api/company/get_all_data`
const searchByCompanyNameURL = `${url}/api/search/search_name` // поиск компаний по названию
const searchOccupationURL = `${url}/api/search/search_occupation` // поиск по виду деятельности

const headers = { "Content-Type": "application/json" }


export const companiesDataApi = {

    /**
     * Получаем все данные компании по ИНН
     * @param {String} inn ИНН компании
     * @returns {Array}
     */
    async getCompanyData(inn: string) {
        const response = await axios.post(baseURL, { inn })
        const data = await response.data
        return data
    },

    /**
     * Поиск по названию компании
     * @param {string} searchString строка поиска
     * @returns {Array} возвращает массив объектов MAIN
     */
    async searchByCompanyName(searchString: string) {
        const response = await axios.post(searchByCompanyNameURL, { searchString })
        const data = await response.data
        return data
    },

    /**
     * Поиск по виду деятельности
     * @param {String} occupation 
     * @returns 
     */
    async searchOccupation(occupation: string) {
        const response = await axios.post(searchOccupationURL, { occupation })
        const data = await response.data
        return data
    }
}
