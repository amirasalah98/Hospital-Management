import Patient from '../models/Patient.js'

export const getPatient=async (req,res)=>{
    try{
      const patients=  await Patient.find()
        res.json(patients)
    }catch(error){
        res.status(500).json({ message: 'Error',error: error.message})
    }
}
export const postPatient= async (req,res)=>{
    try{
        const {name,age,gender}= req.body
        if (!name || !age || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newPatient= new Patient({
            name,age,gender
        })
       const savedPatient=await newPatient.save()
       res.status(201).json(savedPatient);
    }catch(error){
        res.status(500).json({message:'Error',error: error.message})
    }
}
export const updatePatient=async(req,res)=>{
    try{
        const {id}= req.params
        const { name, age, gender } = req.body;
       const patient= await Patient.findById(id)
       if(!patient){
        return res.status(404).json({message: "Patient not found"})
       }
       patient.name=name
       patient.age=age
       patient.gender=gender
       const savedPatient= await patient.save()
       res.status(200).json({savedPatient})

    }catch(error){
        res.status(500).json({message:'Error',error:error.message})
    }
}
export const deletePatient=async(req,res)=>{
    try{
        const {id}= req.params
        const deletedPatient= await Patient.findByIdAndDelete(id)
        if(!deletedPatient){
            return res.status(404).json({message:"Patient not found"})
        }
        res.status(200).json({message:"Patient deleted successfully",deletedPatient})
    }catch(error){
        res.status(500).json({message:"Server error", error: error.message})
    }
}