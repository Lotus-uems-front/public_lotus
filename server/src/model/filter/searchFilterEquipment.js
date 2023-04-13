

/**
 * Произвести выбор компаний из массива по полю equipment, из формы Zero
 * @param {Object} db База Данных
 * @param {Array} innArray массив ИНН компаний
 * @param {String} equipment Поле для поиска
 * @returns {Array} ИНН компаний
 */
module.exports = async (db, innArray, equipment) => {

    //todo 1: Запускаем итерацию (forEach) по innArray

    //todo 2: Загружаем форму Zero

    //todo 3: В форме Zero проверяем присутсвия у поля description = "Производственное оборудование" и value = true, тогда сравниваем information = equipment

    //todo 4: При совпадении складываем ИНН в массив, иначе переходим к следующей итерации

    //todo 5: По окончанию всех итераций, возвращаем массив с ИНН компаниями

}