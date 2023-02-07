


module.exports = async (db, arr) => {
    try {
        const PromiseCompanyName = arr.map(inn => {
            return (
                (async () => {
                    const main = await db.collection(inn)
                        .findOne({ _id: 'Main' })

                    return main.data[1].value
                })()
            )
        })
    } catch (err) {
        console.log(`Ошибка сбора компаний в массив: `, err)
    }

}