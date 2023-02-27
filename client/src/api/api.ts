import axios from 'axios'

const port = '5000'
const baseURL = `http://localhost:${port}/api/company/get_all_data`
// const baseURL = `https://test.public.lotus-uems.ru/api/company/get_all_data`

const headers = { "Content-Type": "application/json" }


export const companiesDataApi = {
    async getCompanyData(inn: string) {
        const response = await axios.post(baseURL, { inn })
        const data = await response.data
        return data
    }
}
