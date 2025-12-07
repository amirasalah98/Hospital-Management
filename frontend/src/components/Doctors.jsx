import React, {useState, useEffect} from 'react'
import axios from "axios";
import "./doctors.module.css";
import DoctorCard from "./DoctorCard.jsx";

const Doctors =()=>{
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({ name: "", specialty: ""});
    const [selectedId, setSelectedId] = useState(null); // 
    const isEditMode = Boolean(selectedId);

    useEffect(()=>{
        const fetchDoctors=async()=>{
            try{
                const res= await axios.get("http://localhost:5000/doctors")
                setDoctors(res.data)
            }catch(err){
                console.error("Error fetching doctors",err)
            }
        }
        fetchDoctors()
    },[])
      const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};
    const handleAddDoctors=async(e)=>{
        e.preventDefault();
        try{
          const res=  await axios.post("http://localhost:5000/doctors/add",formData)
          setDoctors((prev)=>[...prev,res.data])
          setFormData({ name: "", age: "", gender: "" })
        }catch(err){
   console.error("Error adding doctor:", err);
        }
    }
    const handleUpdateDoctors=async(e)=>{
         e.preventDefault()
         try{
            await axios.post(`http://localhost:5000/doctors/update/${selectedId}`,formData)
            setDoctors((prev)=>
                prev.map((d)=>
            d._id===selectedId ? {...formData, _id : selectedId}:d)
            )
             resetForm();
         }catch(err){
 console.error("Error updating doctor:", err);

         }

    }
  const  handleEditDoctor=(doctor)=>{
    setFormData({
        name:doctor.name,
        specialty: doctor.specialty
    })
    setSelectedId(doctor._id)
  }
  const  handleDeleteDoctor=async(id)=>{
    try{
        await axios.delete(`http://localhost:5000/doctors/delete/${id}`)
        setDoctors((prev)=>prev.filter((d)=>d._id!==id))
         if (id === selectedId) resetForm();
        }catch(err){
 console.error("Error deleting doctor:", err);
        }
    }


 const resetForm=()=>{
    setSelectedId(null);
    setFormData({
        name:"",
        specialty:""
    })
  }
    return(
         <div className="doctor-main">
            <div className="form-sections">
                <h4>{isEditMode? "Edit doctor":"Add new doctor"}</h4>
                <form onSubmit={isEditMode?handleUpdateDoctors : handleAddDoctors}>

            <label>Name:</label>
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange} 
            />
            <label>Specialty:</label>
            <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange} 
            />
            <button type="submit">
            {isEditMode ? "Update Doctor" : "Add Doctor"}
          </button>
          {isEditMode && (
            <button type="button" onClick={resetForm} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          )}
                </form>
            </div>
            <h3 style={{textAlign:"center"}}>
                Doctors ({doctors.length})
            </h3>
        
        <div className="doctor-list">
        {doctors.map((doctor)=>(
            <DoctorCard 
            key={doctor._id}
            doctor={doctor}
            onEdit={handleEditDoctor}
            onDelete={handleDeleteDoctor}
            />
        ))}
        </div>
        </div>
    )
}
export default Doctors;