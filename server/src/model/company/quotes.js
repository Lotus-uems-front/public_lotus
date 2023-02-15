

/**
 * Убираем двойные ковычки
 * @param {String} data 
 * @returns 
 */
module.exports = (data) => {

    // data.replace(/^["'](.+(?=["']$))["']$/, '$1');

    return data.replace(/['"]+/g, '');

}