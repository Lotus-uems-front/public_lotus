const Router = require('express');
const router = new Router();
const companyRouter = require('./companyRouter')
const searchRouter = require('./searchRouter')
const fileRouter = require('./fileRouter')

router.use('/company', companyRouter)
router.use('/search', searchRouter)
router.use('/file', fileRouter)


module.exports = router;