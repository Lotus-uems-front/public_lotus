

/**
 * Разбиваем массив на блоки по 10
 * @param {*} arr 
 * @param {*} page 
 * @returns 
 */
module.exports = (arr, page) => {

    if (arr.length <= 10) {
        return arr;
    }

    const newArr = arr.slice(((Number(page) - 1) * 10), (Number(page) * 10));

    return newArr;

}