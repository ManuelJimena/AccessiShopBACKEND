const User = require('../models/user.model');
const Cart = require('../models/cart.model');
const Favorites = require('../models/favorites.model');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
const { generateToken } = require("../../utils/token");

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ $or: [{ email }, { username }] });

        if (userExists) {
            return res.status(400).json({ message: "El usuario o correo ya existe" });
        }

        const defaultAvatar = "https://res.cloudinary.com/dhjmt9vvq/image/upload/v1703177893/AccessiSolutions/AvatarDefault_ugwlgv.webp";
        const avatarUrl = req.file ? req.file.path : defaultAvatar;
        const avatarPublicId = req.file ? req.file.filename : null;

        const newUser = new User({
            username,
            email,
            password,
            avatar: avatarUrl,
            avatarPublicId: avatarPublicId
        });

        const newCart = await Cart.create({ user: newUser._id, items: [] });
        const newFavorites = await Favorites.create({ user: newUser._id, products: [] });

        newUser.cart = newCart._id;
        newUser.favorites = newFavorites._id;
        await newUser.save();

        res.status(201).json({ message: "Usuario registrado exitosamente", userId: newUser._id });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const token = generateToken(user._id, user.username);
        const isProfileComplete = user.name && user.phone && user.country && user.province && user.locality && user.address && user.postalCode;

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token,
            isProfileComplete,
            isAdmin: user.isAdmin,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            name: user.name,
            phone: user.phone,
            country: user.country,
            province: user.province,
            locality: user.locality,
            address: user.address,
            postalCode: user.postalCode
        });
    } catch (error) {
        next(error);
    }
};

const updateUserDetails = async (req, res, next) => {
    try {
        const userIdToUpdate = req.params.id;
        const userIdFromToken = req.user._id;

        if (userIdToUpdate !== userIdFromToken.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: "No autorizado para actualizar este usuario" });
        }

        const userToUpdate = await User.findById(userIdToUpdate);
        if (!userToUpdate) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const { name, phone, country, province, locality, address, postalCode } = req.body;
        userToUpdate.name = name || userToUpdate.name;
        userToUpdate.phone = phone || userToUpdate.phone;
        userToUpdate.country = country || userToUpdate.country;
        userToUpdate.province = province || userToUpdate.province;
        userToUpdate.locality = locality || userToUpdate.locality;
        userToUpdate.address = address || userToUpdate.address;
        userToUpdate.postalCode = postalCode || userToUpdate.postalCode;

        await userToUpdate.save();
        res.status(200).json({ message: "Información del usuario actualizada" });
    } catch (error) {
        next(error);
    }
};

const getUserDetails = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userToView = await User.findById(userId);

        if (!userToView) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        if (userToView._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: "No autorizado para ver esta información" });
        }
        res.status(200).json({ userData: userToView });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        if (userId !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: "No autorizado para eliminar este usuario" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await Cart.deleteOne({ user: userId });
        await Favorites.deleteOne({ user: userId });

        if (user.avatarPublicId) {
            await cloudinary.uploader.destroy(user.avatarPublicId);
        }

        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    register,
    login,
    updateUserDetails,
    getUserDetails,
    deleteUser
};
