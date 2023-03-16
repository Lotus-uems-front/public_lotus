const Router = require('express');
const fileController = require('../controllers/fileController');
const router = new Router();

router.post('/get-icon', fileController.getIcon);

module.exports = router;