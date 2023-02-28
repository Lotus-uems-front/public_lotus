const Router = require('express');
const router = new Router();
const searchController = require('../controllers/searchController');

router.post('/saerch_name', searchController.getCompanyName);
router.post('/search_occupation', searchController.getCompanyOccupation);


module.exports = router;