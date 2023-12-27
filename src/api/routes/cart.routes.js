const express = require('express');
const CartRouter = express.Router();
const cartController = require('../controllers/cart.controller');
const { isAuth } = require('../middlewares/auth.middleware');

CartRouter.post('/add', isAuth, cartController.addToCart);
CartRouter.delete('/remove/:productId', isAuth, cartController.removeFromCart);
CartRouter.put('/update/:productId', isAuth, cartController.updateCartQuantity);
CartRouter.get('/', isAuth, cartController.getCartItems);

module.exports = CartRouter;
