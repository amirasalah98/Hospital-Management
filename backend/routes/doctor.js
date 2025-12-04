import {getDoctor, postDoctor,updateDoctor,deleteDoctor} from '../controllers/doctorController.js'
import express from 'express'
const router =express.Router()

router.get('/',getDoctor)
router.post('/add',postDoctor)
router.post('/update/:id',updateDoctor)
router.delete('/delete/:id',deleteDoctor)

export default router