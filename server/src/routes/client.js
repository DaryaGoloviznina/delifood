const { addNewOrder, getClientOrders, deleteClientOrder } = require('../controllers/clientController');
const router = require('express').Router();

router.post('/order/new', addNewOrder);
router.post('/orders/:id', getClientOrders);
router.post('/order/del', deleteClientOrder);

module.exports = router;
