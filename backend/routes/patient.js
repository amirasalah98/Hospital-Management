import {getPatient, postPatient,updatePatient,deletePatient} from '../controllers/patientController.js'
import express from 'express'
const router =express.Router()

router.get('/',getPatient)
router.post('/add',postPatient)
router.post('/update/:id',updatePatient)
router.delete('/delete/:id',deletePatient)

export default router