import express from 'express'
import {Login, verify} from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';



const router = express.Router();



router.post('/login', Login);
router.get('/verify', authMiddleware, verify )




export default router