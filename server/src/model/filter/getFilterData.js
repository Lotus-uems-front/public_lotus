const searchOccupation = require("../search/searchOccupation");



module.exports = async (db, innArray, filterData) => {
    try {
        const arrCompanyProduction = await searchOccupation(db, innArray, filterData[0].production) // массив компаний по виду деятельности
        console.log(`arrCompanyProduction::: `, arrCompanyProduction); // test

    } catch (err) {
        console.log(`Ошибка при получении данных по фильтру: `, err);
        return []
    }
}



/**
 * Zero
 * (2) [{…}, {…}]
 * 0: {production: 'Сосуды и аппараты работающие под давлением', equipment: 'Емкости без внутренних устройств', information: Array(2), subequipment: Array(2)}
 * 1: {production: 'Сосуды и аппараты работающие под давлением',equipment: 'Емкости с внутренними устройствами', information: Array(2), subequipment: Array(2)}
 * length: 2[[Prototype]]: Array(0)
 */

/**
 * 0: 
equipment: 
"Емкости без внутренних устройств"
information: 
Array(2)
0: 
information: 
"Макс объем, м3"
value: 
"122"
[[Prototype]]: 
Object
1: 
information: 
"Макс масса, тн"
value: 
"23"
[[Prototype]]: 
Object
length: 
2
[[Prototype]]: 
Array(0)
subequipment: 
Array(2)
0: 
"Емкости дренажные"
1: 
"Ресиверы"
length: 
2
[[Prototype]]: 
Array(0)
[[Prototype]]: 
Object
 */