import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    await fetch("http://localhost:5000/api/participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    navigate("/participants");
  };

  return (
    <div>
      <h2>Add Participant</h2>

      <input name="first_name" placeholder="First Name" onChange={handleChange} /><br />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="phone" placeholder="Phone" onChange={handleChange} /><br />
      <input name="program" placeholder="Program" onChange={handleChange} /><br />

      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}