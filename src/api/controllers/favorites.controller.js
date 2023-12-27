const Favorites = require('../models/favorites.model');
const Product = require('../models/product.model');

const addToFavorites = async (req, res, next) => {
    try {

        const { productId } = req.body;
        const favorites = await Favorites.findOne({ user: req.user._id });
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto agregado a favoritos', favorites });
    } catch (error) {
        next(error);
    }
};

const removeFromFavorites = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;

        const favorites = await Favorites.findOne({ user: userId });

        if (!favorites) {
            return res.status(404).json({ message: 'Lista de favoritos no encontrada' });
        }

        favorites.products = favorites.products.filter(product => product.toString() !== productId);

        await favorites.save();
        res.status(200).json({ message: 'Producto eliminado de favoritos', favorites });
    } catch (error) {
        next(error);
    }
};

const getFavorites = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const favorites = await Favorites.findOne({ user: userId }).populate('products');

        if (!favorites) {
            return res.status(404).json({ message: 'Lista de favoritos no encontrada' });
        }

        res.status(200).json(favorites.products);
    } catch (error) {
        next(error);
    }
};;

module.exports = {
    addToFavorites,
    removeFromFavorites,
    getFavorites
};
