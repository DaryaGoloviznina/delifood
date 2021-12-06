const router = require('express').Router();

const { upload, updateProfile } = require('../controllers/profileControllers')

router
  .route('/update/')
  .patch(upload.single('store_img'), updateProfile);

module.exports = router;