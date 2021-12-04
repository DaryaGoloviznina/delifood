const router = require('express').Router();
const {   
  createUserAndSession, 
  checkUserAndCreateSession,
  destroySession,
  isUser } = require('../controllers/authController');

router
  .route('/checkUser')
  .get(isUser);

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