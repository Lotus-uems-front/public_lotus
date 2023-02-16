const foldCompanyArr = require("./foldCompanyArr")


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

                    let city = 'Не указан';
                    let ownForm = 'Не указана';
                    let name = 'Не указано'

                    if (main.data[1].value) {
                        name = main.data[1].value
                    }

                    if (main.data[15].value) {
                        city = main.data[15].value
                    }

                    if (main.data[100].value) {
                        ownForm = main.data[100].value
                    }

                    return { companyName: name, inn: main.data[6].value, city: city, ownForm: ownForm }
                })()
            )
        })
        const resultPromise = await Promise.allSettled(PromiseCompany)

        const result = resultPromise.map(item => {
            return item.value
        })

        const companyResult = await foldCompanyArr(result);

        return companyResult;

    } catch (err) {
        console.log(`Ошибка сбора компаний в массив: `, err)
        throw new Error('Ошибка сбора компаний в массив:')
    }

}