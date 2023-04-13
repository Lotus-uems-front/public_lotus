

/**
 * Из массива ИНН компаний отбираем результат по полям information
 * @param {Object} db DB
 * @param {Array} innArray массив ИНН компаний
 * @param {String} equipment поле фильтра
 * @param {Array} information поле фильтра
 * @returns {Array} ИНН компаний
 */
module.exports = async (db, innArray, equipment, information) => {

    //todo 1: итерируемся по массиву innArray

    //todo 1.1: Загружаем форму Zero

    //todo 2: Выбираем блок с information = equipment (длина 10 позиций)

    //todo 3: находим поля с information = information, если находим, то сравниваем поля value согласно условия отбора. Пушаем ИНН или к следующей итерации

    //todo 4: возвращаем массив ИНН компаний


}