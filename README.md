# AccessiShopBACKEND
## Introducción

¡Bienvenido al repositorio de la API de AccessiShop! Esta API impulsa una tienda en línea centrada en productos diseñados para personas con discapacidades. La API permite la gestión de usuarios, productos, carritos de compra y listas de favoritos.

## Cómo Empezar

Esta sección te proporciona una guía sobre cómo comenzar a usar el proyecto.

### Requisitos Previos

Asegúrate de tener las siguientes herramientas instaladas en tu entorno de desarrollo:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/) (para el almacenamiento y gestión de imágenes)

### Instalación

Sigue estos pasos para clonar el repositorio, instalar las dependencias y configurar el proyecto localmente:

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/AccessiShopBACKEND.git

# Navegar al directorio del proyecto
cd AccessiShopBACKEND

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita el archivo .env con tus propios valores

# Iniciar la base de datos (ejemplo con MongoDB)
mongod

# Ejecutar la aplicación
npm start
```

# Endpoints

## Usuarios: Registro, inicio de sesión, actualización de información.
## Productos: Creación, consulta, actualización y eliminación de productos.
## Carrito: Gestión del carrito de compra.
## Favoritos: Gestión de lista de favoritos.

# Uso

## A continuación, se muestran ejemplos de cómo utilizar la API para realizar solicitudes a los endpoints:
```bash
// Ejemplo de solicitud para registrar un nuevo usuario
fetch('https://api.AccessiShopBACKEND.com/users/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: "usuario_ejemplo",
        email: "usuario@ejemplo.com",
        password: "contraseña123"
    })
})
.then(response => response.json())
.then(data => console.log(data));
```
# Contribuir

## ¡Agradecemos tu interés en contribuir al proyecto AccessiShopBACKEND API! Aquí tienes instrucciones sobre cómo puedes colaborar:

Haz un "Fork" del proyecto.
Crea una rama de características (git checkout -b feature/AmazingFeature).
Realiza tus cambios y haz un "Commit" (git commit -m 'Añadir una característica asombrosa').
Haz "Push" a tu rama (git push origin feature/AmazingFeature).
Abre una "Pull Request" para discutir y revisar tus cambios.
Esperamos con interés tus contribuciones y agradecemos tu apoyo para mejorar AccessiShopBACKEND API.
