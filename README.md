# AccessiShop Backend

¡Bienvenido al backend de AccessiShop! Este servidor proporciona API endpoints para manejar la lógica de comercio electrónico y la interacción de datos para la plataforma AccessiShop.

![AccessiShop Backend](src/assets/mockuper.webp)

## 📖 Índice

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Autor](#autor)

## 📘 Descripción

El backend de AccessiShop gestiona todas las operaciones relacionadas con la base de datos, autenticación de usuarios, gestión de productos, carritos de compra y favoritos. Proporciona una interfaz RESTful para interactuar con el frontend de AccessiShop, asegurando que todos los usuarios tengan una experiencia fluida y segura.

## 💻 Tecnologías

Este proyecto está construido con las siguientes tecnologías:
- **Node.js**: El entorno de ejecución para el servidor.
- **Express**: El framework de servidor que facilita la creación de rutas y la gestión de solicitudes HTTP.
- **MongoDB**: La base de datos NoSQL utilizada para almacenar todos los datos de usuarios, productos, etc.
- **Mongoose**: Una biblioteca de modelado para MongoDB que proporciona una solución basada en esquemas para modelar la información de la aplicación.
- **JWT (JSON Web Tokens)**: Utilizado para manejar la autenticación de usuarios y la protección de rutas.
- **Bcrypt**: Para la encriptación y seguridad de las contraseñas de usuario.

## 🛠️ Instalación

Sigue estos pasos para configurar el backend de AccessiShop en tu sistema local:

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/ManuelJimena/accessishop-backend.git
   ```
2. **Instalar dependencias:**

Navega al directorio del backend y ejecuta el siguiente comando para instalar las dependencias necesarias:

```js
npm install
 ```

3. **Configura las variables de entorno:**

Copia el archivo .env.example a .env y modifica las variables para que se ajusten a tu entorno de desarrollo.

4. **Inicia el servidor de desarrollo:**

Ejecuta el siguiente comando para arrancar:

```js
npm run dev
```

## 🖱️ Uso

Una vez que el backend esté en marcha, proporcionará endpoints accesibles para:
- Registrar y autenticar usuarios.
- Añadir, eliminar y actualizar productos en el carrito y en la lista de favoritos.
- Buscar productos y obtener detalles de los mismos.
- Administrar datos de usuario y sus pedidos.

## ✒️ Autor

**Manuel Jimena García** - Manuel.Jimena29@gmail.com

---

¡Gracias por explorar el backend de AccessiShop! Este servidor es crucial para asegurar que AccessiShop funcione de manera eficiente y segura.
