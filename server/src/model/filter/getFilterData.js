const searchOccupation = require("../search/searchOccupation");
const getOneArray = require("./getOneArray");
const searchFilterEquipment = require("./searchFilterEquipment");
const searchFilterInformation = require("./searchFilterInformation");
const searchFilterSubequipment = require("./searchFilterSubequipment");



module.exports = async (db, innArray, filterData) => {
    try {
        console.log(`length >>>> `, filterData.length);
        if (!filterData.length) throw new Error('Фильтр не задан')

        const arrCompanyProduction = await searchOccupation(db, innArray, filterData[0].production) // массив компаний по виду деятельности
        console.log(`arrCompanyProduction::: `, arrCompanyProduction); // test

        const arrResult = await filterData.map(item => {
            return (async () => {
                try {
                    let arrCompany = innArray

                    if (item.equipment) {
                        //*: Делаем поиск только по полю - equipment
                        console.log(`equipment`); // test
                        arrCompany = await searchFilterEquipment(db, innArray, item.equipment)
                        console.log(`RESULT INN equipment::: `, arrCompany); // test
                    }

                    if (item.equipment && item.information.length) {
                        //*: Делаем поиск по полям information
                        console.log(`information`); // test
                        arrCompany = await searchFilterInformation(db, arrCompany, item.equipment, item.information)
                        console.log(`RESULT INN information::: `, arrCompany); // test
                    }

                    if (item.equipment && item.subequipment.length) {
                        //*: Делаем поиск по полю subequipment
                        console.log(`subequipment`); // test
                        arrCompany = await searchFilterSubequipment(db, arrCompany, item.equipment, item.subequipment)
                        console.log(`RESULT INN subequipment::: `, arrCompany); // test
                    }

                    return arrCompany
                } catch (err) {
                    console.log(`Ошибка при поиске компаний по фильтру, выборка: `, err);
                    return arrCompany
                }
            })()
        })

        const resultInn = await Promise.all(arrResult)
        const resultArr = getOneArray(resultInn)

        return resultArr

    } catch (err) {
        console.log(`Ошибка при получении данных по фильтру: `, err);
        return []
    }
}



/**
 * Zero -
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