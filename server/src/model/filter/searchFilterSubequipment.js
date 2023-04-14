

/**
 * Производим отбор компаний по полю subequipment
 * @param {Object} db 
 * @param {Array} innArray 
 * @param {String} equipment 
 * @param {Array} subequipment 
 * @returns {Array} INN
 */
module.exports = async (db, innArray, equipment, subequipment) => {
    try {
        const promiseArr = await innArray.map(item => {
            return (async () => {
                const zero = await db.collection(String(item))
                    .findOne({ _id: 'Zero' })

                if (!zero) return false

                let result = false
                zero.data.forEach(itm => {

                    if (itm.description === equipment && typeof (itm.information) === 'object') {
                        subequipment.forEach(itmSub => {
                            const index = itm.information.indexOf(itmSub)

                            if (index === -1) return false

                            return result = itm.value[index]
                        })
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
        console.log(`Ошибка поиска по полю subequipment: `, err);
        return []
    }
}