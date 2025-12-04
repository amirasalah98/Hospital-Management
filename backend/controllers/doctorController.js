import Doctor from '../models/Doctor.js'

export const getDoctor=async(req,res)=>{
    try{
        // const {name,specialty}=req.body
        const doctors= await Doctor.find()
        res.json(doctors)
    }catch(error){
        res.status(500).json({message:"Error",error:error.message})
    }
}
export const postDoctor=async(req,res)=>{
    try{
        const {name,specialty}=req.body
        if(!name || !specialty){
            return res.status(404).json({message: "All fields are required"})
        }
        const newDoctor= new Doctor({
            name,specialty
        })
      const savedDoctor= await newDoctor.save()
       res.status(200).json(savedDoctor)
    }catch(error){
    res.status(500).json({message:"Error",error:error.message})

    }
}
export const updateDoctor=async(req,res)=>{
    try{
        const {id}=req.params
        const {name,specialty}= req.body
        const doctor= await Doctor.findById(id)
        if(!name || !specialty){
            return res.status(404).json({message: "Doctor not found"})
        }
        doctor.name=name
        doctor.specialty=specialty
        const savedDoctor= await doctor.save()
        res.status(200).json(savedDoctor)
    }catch(error){
        res.status(500).json({message:'Error',error: error.message})
    }
}
export const deleteDoctor=async(req,res)=>{
    try{
        const {id}= req.params
        const deletedDoctor= await Doctor.findByIdAndDelete(id)
        if(!deletedDoctor){
            return res.status(404).json({message:"Doctor is not found"})
        }
        res.status(200).json({message:"Doctor deleted successfully"})
    }catch(error){
        res.status(500).json({message:"Error",error:error.message})
    }
}