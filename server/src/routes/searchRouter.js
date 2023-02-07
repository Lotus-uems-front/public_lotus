const Router = require('express');
const router = new Router();
const searchController = require('../controllers/searchController');

router.post('/get_data', searchController.getData)
router.post('/send_filter', searchController.sendFilter)


module.exports = router;