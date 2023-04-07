import { companiesDataApi } from '../api/api';
import { URL } from '../api/api'

export default async function downloadFile(fileName, login, id) {
    try {
        let file;
        const user = 'leo';
        // console.log(`URL>>>>> `, URL); // test

        // if (URL === 'http://localhost:5000') {
        //     // file = await companiesDataApi.getIcon(`C:/Users/semen/OneDrive/Рабочий стол/server/uems-uploads/icons/${login}_${fileName}.jpg`)
        //     file = await companiesDataApi.getFile(`D:/github/uems_backend/uems-uploads/icons/${login}_${fileName}.jpg`) // icon_logo           

        // } else {
            file = await companiesDataApi.getFile(`/home/${user}/uems-uploads/Fifteen_-${login}_-${id}_-${fileName}`)
            // '/home/leo/uems-uploads/Fifteen_-1231231231_-2_-1920x1080_1633525862454.jpeg'
            // urlIcon = await companiesDataApi.getIcon(`/home/${user}/uems-uploads/icons/${login}_${fileName}.jpg`)
        // }
        console.log(`${file}`); // test
        return file
    } catch (err) {
        console.log(`Ошибка::: `, err);
        return null
    }
    
}