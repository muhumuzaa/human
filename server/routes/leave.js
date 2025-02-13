import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addOrEditLeave,  fetchLeaves,  fetchLeaveById,  fetchLeavesByUser, updateLeave } from '../controllers/leaveController.js'


const router = express.Router()


router.post('/add', authMiddleware, addOrEditLeave)
router.get('/user/:id', authMiddleware, fetchLeavesByUser)
router.get('/:id', authMiddleware, fetchLeaveById)
router.get('/', authMiddleware, fetchLeaves)
router.put('/update/:id', authMiddleware, updateLeave)

export default router;