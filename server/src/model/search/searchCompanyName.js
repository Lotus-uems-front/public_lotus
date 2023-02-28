const getMainForm = require("./getMainForm");


/**
 * Поиск компаний по названию
 * @param {Object} db 
 * @param {Array} innArr массив ИНН компаний 
 * @param {String} data строка для поиска совпадений в названии компании
 * @returns {Array} Результат поиска - массив объектов
 */
module.exports = async (db, innArr, data) => {
    try {

        const mainArr = await getMainForm(db, innArr)
        const lowerData = data.toLowerCase();

        const result = mainArr.filter(item => (item.data[1].value).toLowerCase().indexOf(lowerData))

    } catch (err) {
        console.log(`Ошибка при формировании массива компаний, поиск по названию: `, err);
        return ([])
    }

    return ({ server: 'тут будет результат' })
}