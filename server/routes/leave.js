import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addOrEditLeave,  fetchLeaves,  fetchLeaveById,  fetchLeavesByUser, updateLeave, fetchLeavesByEmployee } from '../controllers/leaveController.js'


const router = express.Router()


router.post('/add', authMiddleware, addOrEditLeave)
router.get('/user/:id', authMiddleware, fetchLeavesByUser)
router.get('/:id', authMiddleware, fetchLeaveById)
router.get('/', authMiddleware, fetchLeaves)
router.put('/update/:id', authMiddleware, updateLeave)

//for admin to fetch all leaves of a particular employee
router.get('/emp/:id', authMiddleware, fetchLeavesByEmployee)

export default router;