const express = require("express");
const UserRouter = express.Router();
const userController = require('../controllers/user.controller');
const { upload } = require("../../middlewares/files.middleware");
const { isAuth, isAdmin } = require("../../middlewares/auth.middleware");

UserRouter.post('/register', upload.single('avatar'), userController.register);
UserRouter.post("/login", userController.login);
UserRouter.put('/update/:id', isAuth, userController.updateUserDetails);
UserRouter.get('/:id', isAuth, userController.getUserDetails);
UserRouter.delete('/:id', isAuth, isAdmin, userController.deleteUser);

module.exports = UserRouter;
