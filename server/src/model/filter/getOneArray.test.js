const getOneArray = require('./getOneArray');

test('Из массивов ИНН делаем один массив', () => {
    expect(getOneArray([[12, 45, 85], [789, 55, 11]])).toEqual([12, 45, 85, 789, 55, 11]);
})