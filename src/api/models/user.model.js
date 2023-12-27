const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: [5, "El nombre de usuario debe tener al menos 5 caracteres"],
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [8, "La contraseña debe tener al menos 8 caracteres"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: [validator.isEmail, "Correo electrónico inválido"],
        unique: true
    },
    avatar: {
        type: String,
        required: false
    },
    avatarPublicId: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: ""
    },
    phone: { 
        type: String, 
        required: false, 
        validate: {
            validator: function(v) {
                return v === "" || /\d{9}/.test(v);
            },
            message: props => `${props.value} no es un número de teléfono válido`
        },
        default: "" 
    },
    country: {
        type: String,
        default: ""
    },
    province: {
        type: String,
        default: ""
    },
    locality: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    postalCode: { 
        type: String, 
        required: false, 
        validate: {
            validator: function(v) {
                return v === "" || /\d{5}/.test(v);
            },
            message: props => `${props.value} no es un código postal válido`
        },
        default: "" 
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    favorites: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favorites'
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
