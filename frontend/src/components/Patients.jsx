import React, { useState, useEffect } from "react";
import axios from "axios";
import "./patients.module.css";
import PatientCard from "./PatientCard.jsx";

const Patients=()=>{
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState({ name: "", age: "", gender: "" });
      const [selectedId, setSelectedId] = useState(null); // 
  const isEditMode = Boolean(selectedId); // lw feh selctedId hyb2a true, lw mfesh hyb2a false


    useEffect(()=>{
        const fetchPatients= async()=>{
            try{
                const res= await axios.get('http://localhost:5000/patients')
                setPatients(res.data)
            }catch(err){
                console.error("Error fetching patients:", err)
            }
        }
        fetchPatients()
    },[])
    const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};
    const handleAddPatient=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post(
                "http://localhost:5000/patients/add",formData //form data is sending data to backend to add
            )
            setPatients((prev)=>[...prev,res.data])
            setFormData({ name: "", age: "", gender: "" })
        }catch(err){
                  console.error("Error adding patient:", err);

        }
    }
    const handleUpdatePatient=async(e)=>{
        e.preventDefault()
        try{
            await axios.post(`http://localhost:5000/patients/update/${selectedId}`,formData)
            setPatients((prev)=>
            prev.map((p)=>
            p._id===selectedId ? {...formData, _id : selectedId}:p)
            )
              resetForm();
        }catch(err){
 console.error("Error updating patient:", err);
        }
    }
    const handleDeletePatient= async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/patients/delete/${id}`)
            setPatients((prev)=>prev.filter((p)=> p._id!==id))
             if (id === selectedId) resetForm();
        }catch(err){
 console.error("Error deleting patient:", err);
        }
    }
    const handleEditPatient=(patient)=>{
        setFormData({
            name:patient.name,
            age: patient.age,
            gender:patient.gender
        })
        setSelectedId(patient._id)
    }
     const resetForm = () => {
    setSelectedId(null);
    setFormData({ name: "", age: "", gender: "" });
  };
    return(
         <div className="patient-main">
      <div className="form-sections">
        <h4>{isEditMode ? "Edit Patient" : "Add New Patient"}</h4>
        <form onSubmit={isEditMode ? handleUpdatePatient : handleAddPatient}>
            <label>Name:</label>
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Age:</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />

          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
           <button type="submit">
            {isEditMode ? "Update Patient" : "Add Patient"}
          </button>

{isEditMode && (
            <button type="button" onClick={resetForm} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          )}

        </form>
        </div>
        <div>
            <h3 style={{textAlign:"center"}}>
                Patients ({patients.length})
            </h3>
        
        <div className="patient-list">
            {patients.map((patient)=>(
                <PatientCard 
                key={patient._id}
                patient={patient}
                onEdit={handleEditPatient}
                onDelete={handleDeletePatient}
                />
            ))}

        </div>
        </div>
        </div>
    )
}

export default Patients;

