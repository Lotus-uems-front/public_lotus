const readFileFromFolder = require('./readFileFromFolder');


module.exports = async (req, res, fileName) => {
    //* проверка на полный путь до файла
    if ((typeof ((fileName).split('/')) === 'object') && ((fileName).split('/')).length > 1) {
        console.log(`OBJECT`); // test

        return await readFileFromFolder(req, res, fileName);

    } else {
        console.log(`STRING`); // test           
        const newFileName2 = `${req.filePath}/${fileName}`; //* только для формы Fifteen

        return await readFileFromFolder(req, res, newFileName2);
    }

}