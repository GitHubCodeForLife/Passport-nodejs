var express = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController');
const { checkNotAuthenticated} = require('../config/auth');
const passport = require('passport');
/* GET home page. */
router.get('/',homeController.index);
router.get('/login',checkNotAuthenticated, homeController.login);
router.get('/register',checkNotAuthenticated, homeController.register);
router.post('/register',checkNotAuthenticated,homeController.postRegister);
router.post('/login',checkNotAuthenticated, passport.authenticate('local', { successRedirect: '/users/dashboard',
        failureRedirect: '/login',
        failureFlash: true }));

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

module.exports = router;
