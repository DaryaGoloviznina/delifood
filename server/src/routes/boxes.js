const router = require('express').Router();
const {   
  getAllBoxes,
  getAllCuisines
  } = require('../controllers/boxController');

router
  .route('/allBoxes')
  .get(getAllBoxes);

router
  .route('/allCuisines')
  .get(getAllCuisines);

module.exports = router;