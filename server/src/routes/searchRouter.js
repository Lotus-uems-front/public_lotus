const Router = require('express');
const router = new Router();
const searchController = require('../controllers/searchController');

router.post('/search_name', searchController.getCompanyName);
router.post('/search_occupation', searchController.getCompanyOccupation);
router.post('/filter', searchController.getCompanyFilter);


module.exports = router;