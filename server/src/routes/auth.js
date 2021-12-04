const passport = require('passport');
// const { isUser, signOut } = require('../controllers/authController');
const {   
  createUserAndSession, 
  checkUserAndCreateSession,
  destroySession,
  isUser } = require('../controllers/authController');
const router = require('express').Router();

// router.get('/isUser', isUser);
router
  .route('/checkUser')
  .get(isUser);

// router
//   .route('/signup')
//   .post(passport.authenticate('local'), isUser);

// router
//   .route('/login')
//   .post(passport.authenticate('local'), isUser);

// router
//   .route('/signout')
//   .get(signOut);

router
  .route('/signup')
  .post(createUserAndSession);

router
  .route('/login')
  .post(checkUserAndCreateSession);

router
  .route('/signout')
  .get(destroySession);




module.exports = router;