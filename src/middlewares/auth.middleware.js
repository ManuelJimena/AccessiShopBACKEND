const { verifyToken } = require('../utils/token');
const User = require('../api/models/user.model')

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "Acceso denegado, no se proporcionó token" });
        }

        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: "Token inválido" });
    }
};

const isAdmin = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Acceso denegado, se requiere rol de administrador" });
    }
    next();
};

module.exports = {
    isAuth,
    isAdmin
};
