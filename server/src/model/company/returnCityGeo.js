const GEO = require('../../geo')

/**
 * Возвращает геолокацию выбранного города
 * @param {String} city 
 * @returns {Array} массив геолокации
 */
module.exports = (city) => {

    let geo = GEO.GEO.find(item => item.name === city)
    // console.log(`GEO::: ${geo.coords}:::>  `, [geo.coords.lat, geo.coords.lon]); // test

    if (!geo) {
        return []
    }
    return [Number(geo.coords.lat), Number(geo.coords.lon)]
}