const router = require('express').Router();
const {   
  getAllBoxes,
  getAllCuisines,
  getFilteredBoxes
  } = require('../controllers/boxController');

router
  .route('/allBoxes')
  .get(getAllBoxes);

router
  .route('/allCuisines')
  .get(getAllCuisines);

router
  .route('/filter')
  .post(getFilteredBoxes);

module.exports = router;