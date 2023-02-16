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
        let notQuotes
        console.log(`RUN compare`); // test

        if (elem && elem.companyName) {
            notQuotes = quotes(elem.companyName); // убираем двойные ковычки
        }

        let own = '';

        if (elem ?? elem.ownForm) {
            own = elem.ownForm
        }

        if (elem && elem.city && result.find(item => Object.keys(item).includes(elem.city))) {
            // console.log(`includes ${elem.city} --- `, result.filter(itm => itm[elem.city])[0][elem.city].companies); // test

            const resultFilter = result.filter(itm => itm[elem.city])[0][elem.city].companies

            if (elem && elem.inn) {
                resultFilter.push(
                    {
                        "inn": elem.inn,
                        "name": `${own} '${notQuotes}'`,
                    }
                )
            }

        } else {

            if (elem && elem.city && elem.inn) {
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
        }

    });

    return result;

}