const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const productIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (productIndex > -1) {
            cart.items[productIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        next(error);
    }
};

const removeFromCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        const productId = req.params.productId;
        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();
        res.status(200).json({ message: 'Producto eliminado del carrito', cart });
    } catch (error) {
        next(error);
    }
};


const getCartItems = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.status(200).json(cart.items);
    } catch (error) {
        next(error);
    }
};

const updateCartQuantity = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const productIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (productIndex > -1) {

            cart.items[productIndex].quantity = quantity;

            if (quantity <= 0) {
                cart.items.splice(productIndex, 1);
            }

            await cart.save();
            res.status(200).json({ message: 'Cantidad del producto actualizada', cart });
        } else {
            res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }
    } catch (error) {
        next(error);
    }
};

const clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        cart.items = [];

        await cart.save();
        res.status(200).json({ message: 'Carrito vaciado', cart });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    addToCart,
    removeFromCart,
    getCartItems,
    updateCartQuantity,
    clearCart
};
