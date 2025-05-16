import React, { useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [Region, setRegion] = useState("");
  const [Doante, setDoante] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchDoante = async () => {
    if (!bloodGroup || !Region) {
      alert("Please select a blood group and enter a location.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`Searching for: ${bloodGroup}, ${Region}`);
      const response = await axios.get("http://localhost:5000/api/Doante/search", {
        params: { bloodGroup, Region },
      });

      console.log("API Response:", response.data);
      setDoante(response.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
      setError("Failed to fetch donors. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🩸 Blood Bank</h1>
      <p>Find blood donors near you.</p>

      <div className="search-section">
        <select onChange={(e) => setBloodGroup(e.target.value)} value={bloodGroup}>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <input
          type="text"
          placeholder="Enter Location"
          value={Region}
          onChange={(e) => setRegion(e.target.value)}
        />

        <button onClick={searchDoante} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="Doante-list">
        {loading ? (
          <p>Loading donors...</p>
        ) : Doante.length > 0 ? (
          Doante.map((donor, index) => (
            <div key={index} className="Doante-card">
              <h3>{donor.name}</h3> 
              <p><b>Blood Group:</b> {donor.bloodGroup}</p>
              <p><b>Location:</b> {donor.Region}</p>
              <p><b>Phone:</b> {donor.phoneNumber}</p>
              <p><b>Alternate Phone:</b> {donor.AlternatePhoneNumber}</p>
              <p><b>Willing to Donate:</b> {donor.willingOrNot?"YES":""}</p>
            </div>
          ))
        ) : (
          <p>Donate Blood Save Life 🩸</p>
        )}
      </div>
    </div>
  );
};

export default Home;
