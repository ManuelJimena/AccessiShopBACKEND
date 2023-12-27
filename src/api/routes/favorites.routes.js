const express = require('express');
const FavoritesRouter = express.Router();
const favoritesController = require('../controllers/favorites.controller');
const { isAuth } = require('../middlewares/auth.middleware');

FavoritesRouter.post('/add', isAuth, favoritesController.addToFavorites);
FavoritesRouter.delete('/remove/:productId', isAuth, favoritesController.removeFromFavorites);
FavoritesRouter.get('/', isAuth, favoritesController.getFavorites);

module.exports = FavoritesRouter;
