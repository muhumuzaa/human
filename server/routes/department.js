import express from 'express'
import { addDepartment, getDepartments, delDepartment, updateDepartment } from '../controllers/depController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
router.post('/add', authMiddleware, addDepartment)
router.get('/list', getDepartments)
router.delete('/delete', authMiddleware, delDepartment)
router.put('/update/:id', authMiddleware, updateDepartment)
export default router