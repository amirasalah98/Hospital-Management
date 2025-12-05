import React, { useState, useEffect } from "react";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import "./appointment.module.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    date: "",
  });
  const [selectedId, setSelectedId] = useState(null);

  const isEditMode = Boolean(selectedId);

  // Fetch all appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/appointments");
        setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new appointment
  const handleAddAppointment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/appointments/add",
        formData
      );
      setAppointments((prev) => [...prev, res.data]);
      resetForm();
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  // Update existing appointment
  const handleUpdateAppointment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/appointments/update/${selectedId}`,
        formData
      );

      setAppointments((prev) =>
        prev.map((app) =>
          app._id === selectedId ? { ...formData, _id: selectedId } : app
        )
      );

      resetForm();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  // Delete appointment
  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/appointments/delete/${id}`
      );

      setAppointments((prev) => prev.filter((app) => app._id !== id));

      if (id === selectedId) resetForm();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  // Edit appointment - load data into the form
  const handleEditAppointment = (appointment) => {
    setFormData({
      patientName: appointment.patientName,
      doctorName: appointment.doctorName,
      date: appointment.date,
    });
    setSelectedId(appointment._id);
  };

  // Reset form + exit edit mode
  const resetForm = () => {
    setFormData({
      patientName: "",
      doctorName: "",
      date: "",
    });
    setSelectedId(null);
  };

  return (
    <div className="flex-row" style={{ width: "100%" }}>
      {/* -------- Form Section -------- */}
      <div className="add-form">
        <h4>{isEditMode ? "Edit Appointment" : "Add New Appointment"}</h4>

        <form
          className="appointment-form"
          onSubmit={isEditMode ? handleUpdateAppointment : handleAddAppointment}
        >
          <label>Patient Name:</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
          />

          <label>Doctor Name:</label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
          />

          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <button type="submit">
            {isEditMode ? "Update Appointment" : "Add Appointment"}
          </button>

          {isEditMode && (
            <button type="button" onClick={resetForm} style={{ marginLeft: 10 }}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* -------- Appointments List -------- */}
      <div className="appointments">
        <h3>Appointments ({appointments.length})</h3>

        <div className="appointment-list">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
