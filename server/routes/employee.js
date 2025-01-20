import express from 'express'
import { addEmployee, getEmployees } from '../controllers/empController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, Date.now() + '-'+ file.originalname)
    }
})
const upload = multer({storage})

router.get('/list', getEmployees)
router.post('/add', authMiddleware, upload.single('image'), addEmployee)

export default router;