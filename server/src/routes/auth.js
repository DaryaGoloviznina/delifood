const passport = require('passport');
const { isUser, signOut } = require('../controllers/authController');
const router = require('express').Router();

// router.get('/isUser', isUser);
router
  .route('/checkUser')
  .get(isUser);

router
  .route('/signup')
  .post(passport.authenticate('local'), isUser);

router
  .route('/login')
  .post(passport.authenticate('local'), isUser);

router
  .route('/signout')
  .get(signOut);


module.exports = router;