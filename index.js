const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connect = require("./src/utils/db");
const { configCloudinary } = require("./src/middlewares/files.middleware");
const server = express();

connect();
configCloudinary();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors({
    origin: ["https://accessi-solutions-frontend.vercel.app/", "http://localhost:5173"],
    credentials: true,
}));

const ProductRouter = require("./src/api/routes/product.routes");
server.use("/products", ProductRouter);
const UserRouter = require("./src/api/routes/user.routes");
server.use("/users", UserRouter);

server.use("*", (req, res) => {
    return res.status(404).json("Ruta no encontrada");
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
