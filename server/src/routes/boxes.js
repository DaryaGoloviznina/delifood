const router = require('express').Router();
const {   
  getAllBoxes,
  getAllCuisines,
  getFilteredBoxes,
  getSearchedBoxes
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

router
  .route('/search')
  .post(getSearchedBoxes);

module.exports = router;