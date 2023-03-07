const occupationTypes = require('./constOccupation')

/**
 * Поиск компаний по виду деятельности
 * @param {*} db 
 * @param {*} innArr 
 * @param {*} occupation 
 */
module.exports = async (db, innArr, occupation) => {

    const indexTypes = occupationTypes.indexOf(occupation)
    console.log(`occupation index >>>>> `, indexTypes); // test

    if (indexTypes === -1) {
        return []
    }

    const promiseResult = innArr.map(item => {
        return (async () => {
            const production = await db.collection(item)
                .findOne({ _id: 'Production' })

            if (production && production.data[2].value[indexTypes]) {
                return item
            } else {
                return false
            }
        })()
    })

    const result = await Promise.all(promiseResult)
    const resultInn = result.filter(item => item !== false)

    return resultInn
}