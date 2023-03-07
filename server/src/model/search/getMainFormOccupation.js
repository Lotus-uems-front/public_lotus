

/**
 * Получаем массив объектов Main отобранных компаний
 * @param {*} db 
 * @param {*} arrInn 
 * @returns 
 */
module.exports = async (db, arrInn) => {

    const promiseResult = arrInn.map(item => {
        return (async () => {
            const main = await db.collection(item)
                .findOne({ _id: 'Main' })

            return main
        })()
    })

    const result = Promise.all(promiseResult)

    return result
}