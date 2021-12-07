const { addNewBox, getActiveBoxes, editBox, deleteBox, getActiveOrders, giveOrder, deleteOrder, deleteAll } = require('../controllers/crmController');
const router = require('express').Router();

router.post('/box/new', addNewBox);
router.get('/boxes/:id', getActiveBoxes);
router.post('/box/edit', editBox);
router.post('/box/delete/:id', deleteBox);
router.get('/orders/:id', getActiveOrders);
router.post('/order/pickedup', giveOrder);
router.post('/order/delete/:id', deleteOrder);
router.post('/all/delete', deleteAll);

module.exports = router;

