import express from 'express'
import { addDepartment, getDepartments, delDepartment } from '../controllers/depController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
router.post('/add', authMiddleware, addDepartment)
router.get('/list', getDepartments)
router.delete('/delete', authMiddleware, delDepartment)


export default router