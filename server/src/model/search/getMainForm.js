

/**
 * Получаем массив MAIN форм
 * @param {Object} db 
 * @param {Array} innArr массив ИНН
 * @returns 
 */
module.exports = async (db, innArr) => {
    try {

        const promiseComapnyName = await innArr.map(itm => {
            return (async () => {
                const mainForm = await db.collection(itm)
                    .findeOne({ _id: 'Main' })

                return (mainForm)
            })()
        })

        const resultPromis = Promise.all(promiseComapnyName)

    } catch (err) {
        console.log(`Ошибка при формировании массива MAIN форм: `, err);
        return ([])
    }

    return ({ server: 'тут будет результат' })
}