const Router = require('express');
const router = new Router();
const companyController = require('../controllers/companyController');

router.post('get_all_company', companyController.getAllCompanies)
router.post('/get_data', companyController.getDataCompany)


module.exports = router;