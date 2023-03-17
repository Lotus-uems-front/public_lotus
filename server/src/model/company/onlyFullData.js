
/**
 * Убираем пустые формы
 * @param {Array} arr 
 * @returns 
 */
module.exports = (arr) => {
    console.log(`Убираем пустые формы`); // test
    let result = [];

    arr.forEach(elem => {

        if (elem._id === 'start') result.push(elem)

        if (elem._id && elem.data.length) result.push(elem)
    })

    return result
}