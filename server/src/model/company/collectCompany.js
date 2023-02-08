

/**
 * Формирует массив объектов по компаниям из Main
 * @param {Object} db 
 * @param {Array} arr 
 * @returns {Array} Массив объектов с данными по компаниям
 */
module.exports = async (db, arr) => {
    try {
        const PromiseCompany = arr.map(inn => {
            return (
                (async () => {
                    const main = await db.collection(inn)
                        .findOne({ _id: 'Main' })

                    return { companyName: main.data[1].value, inn: main.data[6].value, city: main.data[15].value }
                })()
            )
        })
        const resultPromise = await Promise.allSettled(PromiseCompany)

        const result = resultPromise.map(item => {
            return item.value
        })

        return result

    } catch (err) {
        console.log(`Ошибка сбора компаний в массив: `, err)
        throw new Error('Ошибка сбора компаний в массив:')
    }

}