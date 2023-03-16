import { companiesDataApi } from '../api/api';
import { URL } from '../api/api'

export default async function loadImageUrl(fileName: string, login: string) {
    try {
        let urlIcon;
        const user = 'leonid';

        console.log(`URL::: ${URL}`); // test

        if (URL === 'http://localhost:5000') {
            urlIcon = await companiesDataApi.getIcon(`D:/github/uems_backend/uems-uploads/icons/${login}_${fileName}.jpg`) // icon_logo
        } else {
            urlIcon = await companiesDataApi.getIcon(`/home/${user}/uems-uploads/icons/${login}_${fileName}.jpg`)
        }

        return urlIcon
    } catch (err) {
        console.log(`Ошибка::: `, err);
        return null
    }

}