import React from "react";

const PatientCard = ({ patient, onEdit, onDelete }) => {
  const { name, age, gender, _id } = patient;

  return (
    <div className="patient-card">
      <h4>{name}</h4>
      <p>Age: {age}</p>
      <p>Gender: {gender}</p>

      <div className="btn-container w-full">
        <button onClick={() => onEdit(patient)}>Edit</button>
        <button onClick={() => onDelete(_id)}>Delete</button>
      </div>
    </div>
  );
};

export default PatientCard;
