const Router = require('express');
const router = new Router();
const companyController = require('../controllers/companyController');
const testRouter = require('./testRouter');

router.get('/get_all_company', companyController.getAllCompanies)
router.post('/get_data', companyController.getDataCompany)
router.get('/test', testRouter)


module.exports = router;