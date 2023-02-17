const Router = require('express');
const router = new Router();
const companyRouter = require('./companyRouter')
const searchRouter = require('./searchRouter')

router.use('/company', companyRouter)
router.use('/search', searchRouter)


module.exports = router;