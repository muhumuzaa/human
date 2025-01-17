import express from 'express'
import { addEmployee } from '../controllers/empController.js'

const router = express.Router()

router.post('/add', addEmployee)

export default router;