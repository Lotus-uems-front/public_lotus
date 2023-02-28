


/**
 * Поиск компаний по названию
 * @param {Object} db 
 * @param {Array} innArr массив ИНН компаний 
 * @param {String} data строка для поиска совпадений в названии компании
 * @returns {Array} Результат поиска - массив объектов
 */
module.exports = async (db, innArr, data) => {
    try {

        const resultPromise = innArr.map(inn => {
            return (async () => {
                try {
                    let regNameCompany = new RegExp(data, 'i');

                    const result = await db.collection(String(inn))
                        .find({
                            $and: [
                                { _id: 'Main' },
                                { 'data.1.value': { $regex: regNameCompany } },
                            ]
                        })
                        .toArray();
                    return result;

                } catch (err) {
                    console.log(`Ошибка при фильтре компаний:  `, err);
                    return ([])
                }
            })();
        })

        const resultCompanyName = await Promise.all(resultPromise)

        let resultMainForm = []

        resultCompanyName.forEach(item => {
            if (item && item.length > 0) resultMainForm.push(item[0])
        })

        return resultMainForm

    } catch (err) {
        console.log(`Ошибка при формировании массива компаний, поиск по названию: `, err);
        return ([])
    }
}