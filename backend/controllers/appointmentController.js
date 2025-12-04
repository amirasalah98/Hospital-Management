import Appointment from '../models/Appointment.js'

export const getAppointment=async(req,res)=>{
    try{
      const appointments=  await Appointment.find()
      res.json(appointments)

    }catch(error){
        res.status(500).json({message:"Error",error:error.message})
    }
}
export const postAppointment=async(req,res)=>{
    try{
        const {patientName,doctorName,date}= req.body
        if(!patientName || !doctorName || !date){
            return res.status(404).json({message: "All fields are required"})
        }
        const newAppointment= new Appointment({
            patientName,doctorName,date
        })
        const savedAppointment= await newAppointment.save()
        res.status(201).json(savedAppointment)
    }catch(error){
        res.status(500).json({message:"Error",error:error.message})
    }
}
export const updatedAppointment=async(req,res)=>{
    try{
        const {id}=req.params
        const{patientName,doctorName,date}=req.body
        const appointment= await Appointment.findById(id)
         if(!patientName || !doctorName || !date){
            return res.status(404).json({message: "Not found"})
        }
        appointment.patientName=patientName
        appointment.doctorName=doctorName
        appointment.date=date
        const savedAppointment= await appointment.save()
        res.status(200).json(savedAppointment)

    }catch(error){
   res.status(500).json({message:'Error',error:error.message})
    }
}
export const deleteAppointment= async(req,res)=>{
try{
    const {id}=req.params
   const deletedAppointment= await Appointment.findByIdAndDelete(id)
    if(!deletedAppointment){
            return res.status(404).json({message:"appointment not found"})
        }
    res.status(200).json({message: 'appointment deleted successfully'})
}catch(error){
res.status(500).json({message:"Error",error:error.message})
}
}