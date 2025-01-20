import express from 'express'
import { addEmployee, getEmployees } from '../controllers/empController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import upload from '../middlewares/multerMiddleware.js'


const router = express.Router()



router.get('/list', getEmployees)
router.post('/add', authMiddleware, upload.single('image'), addEmployee)

export default router;