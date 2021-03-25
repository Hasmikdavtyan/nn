var express = require('express');
var router = express.Router();
const {loginView, loginUser}= require('../controllers/adminController')



/* GET users listing. */
router.route('/')
.get(loginView)
.post(loginUser)

module.exports = router;

