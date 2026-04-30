import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

export default function AddParticipant() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    program: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.first_name || !form.email) {
      alert("First Name and Email are required");
      return;
    }

    try {
      await fetch("https://cetat-backend.onrender.com/api/participants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      alert("Participant added!");
      navigate("/participants");
    } catch (err) {
      console.error(err);
      alert("Error saving participant");
    }
  };

  return (
    <MainLayout title="Add Participant">
      

      <div style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        gap: "10px"
      }}>
        <input style={{ width: "100%" }} name="first_name" placeholder="First Name" onChange={handleChange} />
        <input style={{ width: "100%" }} name="last_name" placeholder="Last Name" onChange={handleChange} />
        <input style={{ width: "100%" }} name="email" placeholder="Email" onChange={handleChange} />
        <input style={{ width: "100%" }} name="phone" placeholder="Phone" onChange={handleChange} />
        <input style={{ width: "100%" }} name="program" placeholder="Program" onChange={handleChange} />
        <input type="date" name="start_date" onChange={handleChange} />
        <input type="date" name="end_date" onChange={handleChange} />

        <button style={{ width: "50%" }} onClick={handleSubmit}>
        Save
        </button>
      </div>
    </MainLayout>
  );
}