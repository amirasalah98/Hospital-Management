import React from "react";

const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  const { patientName, doctorName, date, _id } = appointment;

  return (
    <div className="appointment-card">
      <p>
        <strong>Patient:</strong> {patientName}
      </p>

      <p>
        <strong>Doctor:</strong> {doctorName}
      </p>

      <p>
        <strong>Date:</strong> {new Date(date).toLocaleDateString()}
      </p>

      <div className="btn-container">
        <button onClick={() => onEdit(appointment)}>Edit</button>
        <button onClick={() => onDelete(_id)}>Delete</button>
      </div>
    </div>
  );
};

export default AppointmentCard;
