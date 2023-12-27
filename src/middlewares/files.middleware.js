const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const configCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });

    const config = cloudinary.config();
    if (config.cloud_name && config.api_key && config.api_secret) {
        console.log("Cloudinary configurado y listo!");
    } else {
        console.error("Error en la configuración de Cloudinary!");
    }
}

function generatePublicId(originalName) {
    const uniqueSuffix = Date.now() + '-' + uuidv4();
    const nameWithoutExt = originalName.split('.').slice(0, -1).join('.'); 
    return `AccessiSolutions/${nameWithoutExt}-${uniqueSuffix}`;
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'AccessiSolutions',
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
        public_id: (req, file) => generatePublicId(file.originalname)
    },
});

const upload = multer({ storage: storage });

const deleteImage = async (publicId) => {
    if (!publicId) return;

    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error("Error al eliminar imagen de Cloudinary:", error);
    }
};

module.exports = {
    upload,
    deleteImage,
    configCloudinary
};
