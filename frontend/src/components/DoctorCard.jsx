import React from "react";

const DoctorCard=({doctor,onEdit,onDelete})=>{
    const{name,specialty,_id}= doctor
    return(
         <div className="patient-card">
      <h4>{name}</h4>
      <p>{specialty}</p>
      <div className="btn-container w-full">
        <button onClick={() => onEdit(doctor)}>Edit</button>
        <button onClick={() => onDelete(_id)}>Delete</button>
      </div>
        </div>
    )

}

export default DoctorCard