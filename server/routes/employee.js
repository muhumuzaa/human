import express from 'express'
import { addEmployee, deleteEmployee, getEmployees, updateEmployee, getEmployeeByUserId } from '../controllers/empController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import upload from '../middlewares/multerMiddleware.js'


const router = express.Router()



router.get('/list', getEmployees)
router.get('/user/:id', authMiddleware, getEmployeeByUserId)
router.post('/add', authMiddleware, upload.single('image'), addEmployee )
//router.post('/add', authMiddleware, upload.single('image'), addMultipleEmployees )
router.put('/update/:id', authMiddleware, upload.single('image'), updateEmployee)
router.delete('/delete', authMiddleware, deleteEmployee)

export default router;