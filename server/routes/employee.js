import express from 'express'
import { addEmployee, getEmployees } from '../controllers/empController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/list', getEmployees)
router.post('/add', authMiddleware, addEmployee)

export default router;