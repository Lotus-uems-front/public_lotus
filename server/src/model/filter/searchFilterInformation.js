

/**
 * Из массива ИНН компаний отбираем результат по полям information
 * @param {Object} db DB
 * @param {Array} innArray массив ИНН компаний
 * @param {String} equipment поле фильтра
 * @param {Array} information поле фильтра
 * @returns {Array} ИНН компаний
 */
module.exports = async (db, innArray, equipment, information) => {
    try {
        const promiseArr = await innArray.map(item => {
            return (async () => {
                const zero = await db.collection(String(item))
                    .findOne({ _id: 'Zero' })

                if (!zero) return false

                let result = false
                zero.data.forEach(itm => {

                    if (itm.description === equipment && _checkInformation(itm, information)) {
                        result = true
                    }
                })

                if (result) {
                    return item
                } else {
                    return false
                }
            })()
        })

        const arrCompany = await Promise.all(promiseArr)

        return arrCompany
    } catch (err) {
        console.log(`Ошибка поиска по полю information: `, err);
        return []
    }

}

/**
 * Производим сравнение по полям объектов information
 * @param {Object} itm Объект из БД
 * @param {Object} information Объект из фильтра
 */
const _checkInformation = (itm, information) => {
    const objInformation = information.find(item => item.information === itm.information)

    if (objInformation && itm && Number(objInformation.value) <= Number(itm.value)) {
        return true
    } else {
        return false
    }

}