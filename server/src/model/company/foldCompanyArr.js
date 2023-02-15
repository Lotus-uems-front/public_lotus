const quotes = require("./quotes");
const returnCityGeo = require("./returnCityGeo");

/**
 * Формирует законченный массив объектов с гео данными по городам
 * @param {Array} arrObj 
 * @returns 
 */
module.exports = async (arrObj) => {

    const result = []

    arrObj.forEach(elem => {

        console.log(`RUN compare`); // test
        const notQuotes = quotes(elem.companyName); // убираем двойные ковычки
        let own = '';

        if (elem.ownForm) {
            own = elem.ownForm
        }

        if (result.find(item => Object.keys(item).includes(elem.city))) {
            // console.log(`includes ${elem.city} --- `, result.filter(itm => itm[elem.city])[0][elem.city].companies); // test

            const resultFilter = result.filter(itm => itm[elem.city])[0][elem.city].companies
            resultFilter.push(
                {
                    "inn": elem.inn,
                    "name": `${own} '${notQuotes}'`,
                }
            )

        } else {
            returnCityGeo(elem.city) // test

            result.push(
                {
                    [elem.city]: {
                        "geo": returnCityGeo(elem.city),
                        "companies": [
                            {
                                "inn": elem.inn,
                                "name": `${own} '${notQuotes}'`,
                            }
                        ],
                    }
                }
            )
        }

    });

    return result;

}