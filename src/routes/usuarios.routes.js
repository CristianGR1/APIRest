import { Router } from "express";
import {getSesion,createUser} from '../controllers/usuario.controller.js';

const router = Router();

router.get('/login', getSesion);
router.post('/register', createUser);

export default router