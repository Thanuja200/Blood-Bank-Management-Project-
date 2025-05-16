import { useState } from "react";
import API from "../api/axiosInstance";

const RegisterDonor = () => {
    const [formData, setFormData] = useState({ name: "", bloodGroup: "", location: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        API.post("/donors", formData)
            .then(() => alert("Donor Registered"))
            .catch((err) => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="text" name="bloodGroup" placeholder="Blood Group" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterDonor;
