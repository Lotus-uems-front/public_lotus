

/**
 * Произвести выбор компаний из массива по полю equipment, из формы Zero
 * @param {Object} db База Данных
 * @param {Array} innArray массив ИНН компаний
 * @param {String} equipment Поле для поиска
 * @returns {Array} ИНН компаний
 */
module.exports = async (db, innArray, equipment) => {
    try {
        const responseArr = await innArray.map(item => {
            return (async () => {
                const zero = await db.collection(item)
                    .findOne({ _id: 'Zero' })

                if (!zero) return false

                let result = false
                zero.data.forEach(itm => {

                    if (itm.description === 'Производственное оборудование' && itm.information === equipment && itm.value === true) {
                        result = true
                    }
                })

                if (result) {
                    return String(item)
                } else {
                    return false
                }
            })()
        })

        const arrCompany = await Promise.all(responseArr)

        return arrCompany

    } catch (err) {
        console.log(`Ошибка поиска по полю equipment: `, err);
        return []
    }


}