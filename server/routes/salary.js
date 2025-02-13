import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addSalary, deleteSalary, getSalaryByEmpId, getSalaryByUserId } from '../controllers/salaryController.js'


const router = express.Router()

// routes/salary.js
router.get("/employee/:empId", authMiddleware, getSalaryByEmpId); //For the emp salary from the admin
router.get("/user/:userId", authMiddleware, getSalaryByUserId); //For logged in user from employee

router.post('/add', authMiddleware, addSalary)
router.delete('/delete/:id', authMiddleware, deleteSalary)


export default router