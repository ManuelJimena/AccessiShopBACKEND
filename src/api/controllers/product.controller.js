const Product = require('../models/product.model');
const cloudinary = require('cloudinary').v2;

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

const getProductByID = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

const getProductByName = async (req, res, next) => {
    try {
        const products = await Product.find({ name: { $regex: req.params.name, $options: 'i' } });
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
  try {
      const { name, category, description, quality, quantity, price } = req.body;
      const picture = req.file ? req.file.path : "https://res.cloudinary.com/dhjmt9vvq/image/upload/v1703178079/AccessiSolutions/placeholder_jepjhh.webp";
      const picturePublicId = req.file ? req.file.filename : null;

      const newProduct = await Product.create({ name, category, description, picture, picturePublicId, quality, quantity, price });
      res.status(201).json(newProduct);
  } catch (error) {
      next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
      const product = await Product.findById(req.params.id);
      if (!product) {
          return res.status(404).json({ message: 'Producto no encontrado' });
      }

      if (req.file && product.picturePublicId) {
          await cloudinary.uploader.destroy(product.picturePublicId);
      }
      const update = req.body;
      if (req.file) {
          update.picture = req.file.path;
          update.picturePublicId = req.file.filename;
      }

      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
      res.status(200).json(updatedProduct);
  } catch (error) {
      next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
          return res.status(404).json({ message: 'Producto no encontrado' });
      }

      if (product.picturePublicId) {
          await cloudinary.uploader.destroy(product.picturePublicId);
      }

      res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
      next(error);
  }
};

const getByCategory = async (req, res, next) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    getProductByID,
    getProductByName,
    createProduct,
    deleteProduct,
    updateProduct,
    getByCategory
};
