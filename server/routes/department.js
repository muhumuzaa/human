import express from 'express'
import { addDepartment, getDepartments } from '../controllers/depController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
router.post('/add', authMiddleware, addDepartment)
router.get('/list', getDepartments)


export default router