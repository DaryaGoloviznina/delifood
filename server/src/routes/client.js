const { addNewOrder, getClientOrders } = require('../controllers/clientController');
const router = require('express').Router();

router.post('/order/new', addNewOrder);
router.post('/orders/:id', getClientOrders);

module.exports = router;
