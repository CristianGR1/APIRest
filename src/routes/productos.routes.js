import { Router } from "express";
import {getProducts,createProducts,updateProducts,deleteProducts} from '../controllers/productos.controller.js';
import {validarJWT} from '../middlewares/validar-jwt.js'

const router = Router();

router.get('/producto',getProducts);
router.post('/producto',createProducts);
router.put('/producto/:id',updateProducts);
router.delete('/producto/:id',deleteProducts);

export default router