const express = require('express');
const ProductRouter = express.Router();
const productController = require('../controllers/product.controller');
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
const { upload } = require("../../middlewares/files.middleware");

ProductRouter.get('/', productController.getAllProducts);
ProductRouter.get('/:id', productController.getProductByID);
ProductRouter.get('/search/:name', productController.getProductByName);
ProductRouter.get('/category/:category', productController.getByCategory);
ProductRouter.post('/', isAuth, isAdmin, upload.single('picture'), productController.createProduct);
ProductRouter.put('/:id', isAuth, isAdmin, upload.single('picture'), productController.updateProduct);
ProductRouter.delete('/:id', isAuth, isAdmin, productController.deleteProduct);

module.exports = ProductRouter;
