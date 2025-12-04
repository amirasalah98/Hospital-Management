import {getAppointment, postAppointment,updatedAppointment,deleteAppointment} from '../controllers/appointmentController.js'
import express from "express"
const router=express.Router()
router.get('/',getAppointment)
router.post('/add',postAppointment)
router.post('/update/:id',updatedAppointment)
router.delete('/delete/:id',deleteAppointment)
export default router;

