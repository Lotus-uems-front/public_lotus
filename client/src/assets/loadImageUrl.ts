import { companiesDataApi } from '../api/api';
import { URL } from '../api/api'

export default async function loadImageUrl(fileName: string, login: string) {
    try {
        let urlIcon;
        const user = 'leonid';



        if (URL === 'http://localhost:5000') {
            // urlIcon = await companiesDataApi.getIcon(`D:/github/uems_backend/uems-uploads/icons/${login}_${fileName}.jpg`) // icon_logo
            urlIcon = await companiesDataApi.getIcon(`C:/Users/semen/OneDrive/Рабочий стол/server/uems-uploads/icons/${login}_${fileName}.jpg`)

        } else {
            urlIcon = await companiesDataApi.getIcon(`/home/${user}/uems-uploads/icons/${login}_${fileName}.jpg`)
        }
        // console.log(`${urlIcon}`); // test
        return urlIcon
    } catch (err) {
        console.log(`Ошибка::: `, err);
        return null
    }

}