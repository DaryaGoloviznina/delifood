const router = require('express').Router();
const {   
  getAllBoxes,
  getAllCuisines,
  getBoxesByCuisine
  } = require('../controllers/boxController');

router
  .route('/allBoxes')
  .get(getAllBoxes);

router
  .route('/allCuisines')
  .get(getAllCuisines);

router
  .route('/byCuisine')
  .post(getBoxesByCuisine);

module.exports = router;