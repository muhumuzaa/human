import express from 'express'
import {changePassword, Login, verify} from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';



const router = express.Router();



router.post('/login', Login);
router.get('/verify', authMiddleware, verify )
router.post('/changepasswd/:id', authMiddleware, changePassword )




export default router