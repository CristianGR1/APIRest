import { Router } from "express";
import {getCompras,createCompra,getComprasbyId} from '../controllers/compras.controller.js';

const router = Router();

router.get('/compra',getCompras);
router.post('/compra',createCompra);
router.get('/compras',getComprasbyId);

export default router