import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addSalary, getSalary } from '../controllers/salaryController.js'


const router = express.Router()

// routes/salary.js
router.get("/:id", authMiddleware, getSalary);

router.post('/add', authMiddleware, addSalary)


export default router