const doPagination = require('./doPagination')


describe('doPagination', () => {
    test('Пагинация: Массив меньше 10', () => {
        expect(doPagination([1, 2, 3, 4, 5], 2)).toEqual([1, 2, 3, 4, 5]);
    })

    test('Пагинация: Массив больше 10 и ждем вторую страницу', () => {
        expect(doPagination([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 2)).toEqual([11, 12, 13]);
    })
});
