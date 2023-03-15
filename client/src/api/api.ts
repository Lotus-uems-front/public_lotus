import axios from 'axios'
import { Obj } from 'reselect/es/types'

const port = '5000'
const url = `http://localhost:${port}` // для домашнего использования
// const url = `https://test.public.lotus-uems.ru` // для тестового сервера

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
            const data = await response.data
            return data
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
    async searchOccupation(occupation: Object) {
        try {
            const response = await axios.post(searchOccupationURL, { occupation })
            const data = await response.data
            return data
        } catch (err) {
            console.log(`Ошибка в api.ts: `, err);
            return []
        }

    }
}
