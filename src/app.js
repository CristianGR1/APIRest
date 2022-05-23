import express from "express";
import usuariosRoutes from './routes/usuarios.routes.js';
import productosRoutes from './routes/productos.routes.js';
import comprasRoutes from './routes/compras.routes.js';

const app = express();

//Middleware
app.use(express.json());


//Rutas
app.use(usuariosRoutes);
app.use(productosRoutes);
app.use(comprasRoutes);

export default app