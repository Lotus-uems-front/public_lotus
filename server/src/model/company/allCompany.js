

/**
 * Строит и отдает массив объектов компаний
 * @param {*} db 
 */
module.exports = async (db) => {
    try {
        // ИНН зарегистрированных компаний
        const arrSerial = await db.collection('global')
            .findOne({ _id: serial })

    } catch (err) {
        console.log(`Ошибка получения, формирования объекта все компаний: `, err)
    }

}