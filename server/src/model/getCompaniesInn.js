
/**
 * Получаем массив ИНН зарегистрированных компаний
 * @param {*} db 
 * @returns 
 */
module.exports = async (db) => {
    try {

        const result = await db.collection('global')
            .findOne({ _id: 'serial' })

        const innArray = result.data.map(itm => {
            return itm.inn
        })

        return innArray;

    } catch (err) {
        console.log(`Ошибка получения массива ИНН зарегистрированных компаний: `, err);

        return ([]);
    }
}