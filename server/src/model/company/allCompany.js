const collectCompany = require("./collectCompany")


/**
 * Строит и отдает массив объектов компаний
 * @param {*} db 
 * @returns {Array} Возвращает массив объектов
 */
module.exports = async (db) => {
    try {
        // ИНН зарегистрированных компаний
        const serial = await db.collection('global')
            .findOne({ _id: 'serial' })

        const arr = serial.data.map(item => {
            return item.inn
        })

        const result = await collectCompany(db, arr)

        return result;

    } catch (err) {
        console.log(`Ошибка получения, формирования объекта все компаний: `, err)
        throw new Error('Ошибка получения, формирования объекта все компаний:')
    }

}