

/**
 * Из массивов ИНН делаем один массив
 * @param {Array} arr массивы ИНН
 * @returns {Array} один массив ИНН
 */
module.exports = (arr) => {
    let oneArray = []

    arr.forEach(itm => {
        itm.forEach(item => {

            if (item && !oneArray.includes(item)) {
                oneArray.push(item)
            }
        })
    })

    return oneArray
}