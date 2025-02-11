import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addOrEditLeave } from '../controllers/leaveController.js'


const router = express.Router()


router.post('/add', authMiddleware, addOrEditLeave)

export default router;