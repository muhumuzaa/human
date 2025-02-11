import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addOrEditLeave, fetchLeaves } from '../controllers/leaveController.js'


const router = express.Router()


router.post('/add', authMiddleware, addOrEditLeave)
router.get('/', authMiddleware, fetchLeaves)

export default router;