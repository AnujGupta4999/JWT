const express = require('express');
const router = express.Router();
const { userRegisterValidate, userLoginValidate } = require('../utils/userValidation')
// const { ensureAuthenticated } = require('../utils/auth');
/* GET users listing. */
const { registerUser , loginUser , getAllUsers} = require('../controllers/userController');
const { ensureAuthenticated } = require('../utils/auth');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', userRegisterValidate, registerUser);

router.post('/login', userLoginValidate, loginUser);

router.get('/users',ensureAuthenticated, getAllUsers);


module.exports = router;
