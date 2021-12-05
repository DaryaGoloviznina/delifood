const { addNewBox, getActiveBoxes, editBox, deleteBox } = require('../controllers/crmController');
const router = require('express').Router();

router.post('/box/new', addNewBox);
router.get('/boxes/active', getActiveBoxes);
router.post('/box/edit', editBox);
router.post('/box/delete', deleteBox);
module.exports = router;
