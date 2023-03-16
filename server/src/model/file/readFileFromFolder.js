const fs = require('fs').promises;
const path = require('path');
const mime = require('mime');


module.exports = async (req, res, fileName) => {
    try {
        console.log(`START READ FILE FROM FOLDER`); // test
        const file = await fs.readFile(fileName);
        const pathFile = path.join(fileName);
        console.log(`PATH FILE >>>>>>>>>>>>>>>>>>>> `, pathFile); // test

        const fileNameN = await path.basename(pathFile);
        const mimeType = await mime.lookup(pathFile);
        console.log(`DATA FILE -> NAME: ${fileNameN}, TYPE MIME: ${mimeType}`); // test

        return (file);

    } catch (err) {

        // * обрабатывается ошибка, отдаем файл по умолчанию
        try {
            const notIcon = path.join(__dirname, '..', '..', 'no-image.png') //todo: поместить файл, поменять путь
            const file = await fs.readFile(notIcon);
            return (file);

        } catch (err) {
            console.log(`Ошибка загрузки файла : `, err);
            res.json(err)
        }
    }

}