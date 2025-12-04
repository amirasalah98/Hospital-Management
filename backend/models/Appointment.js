import mongoose from "mongoose";
const appointmentSchema =new mongoose.Schema({
 patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    date: { type: Date, required: true }
})
export default mongoose.model('Appointment',appointmentSchema)