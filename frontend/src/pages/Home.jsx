import React, { useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [Region, setRegion] = useState("");
  const [Doante, setDoante] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(""); // NEW

  const [donor, setDonor] = useState({
    name: "",
    bloodGroup: "",
    Region: "",
    phoneNumber: "",
    AlternatePhoneNumber: "",
    willingOrNot: true,
  });

  // 💡 AI Suggestion Logic
  const getAISuggestion = (region) => {
    switch (region.toLowerCase()) {
      case "khammam":
        return "🧠 AI Suggestion: O+ and A+ are mostly needed in Khammam.";
      case "hyderabad":
        return "🧠 AI Suggestion: B+ is high in demand.";
      case "warangal":
        return "🧠 AI Suggestion: AB+ requests are common.";
      case "tirupati":
        return "🧠 AI Suggestion: O- donors are usually in demand in Tirupati.";
      default:
        return `🧠 AI Suggestion: Blood is always in need in ${region}. Thank you for contributing.`;
    }
  };

  const searchDoante = async () => {
    if (!bloodGroup && !Region) {
      alert("Please enter at least one filter (Blood Group or Region).");
      return;
    }

    setLoading(true);
    setError(null);
    setAiSuggestion(""); // Clear old suggestion

    try {
      const response = await axios.get("http://localhost:5000/api/Doante/search", {
        params: { bloodGroup, Region },
      });
      setDoante(response.data);

      // ✅ Set AI suggestion after fetching
      if (Region) {
        const suggestion = getAISuggestion(Region);
        setAiSuggestion(suggestion);
      }

    } catch (error) {
      console.error("Error fetching donors:", error);
      setError("Failed to fetch donors. Please try again.");
    }

    setLoading(false);
  };

  const handleAddDonor = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/Doante", donor);
      alert("Donor added successfully!");
      setDonor({
        name: "",
        bloodGroup: "",
        Region: "",
        phoneNumber: "",
        AlternatePhoneNumber: "",
        willingOrNot: true,
      });
      setShowForm(false);
    } catch (err) {
      alert("Failed to add donor");
    }
  };

  return (
    <div className="container">
      <h1>🩸 Blood Bank</h1>
      <p>You can search by <strong>Blood Group</strong>, <strong>Region</strong>, or both.</p>

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

        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "➕ Add Details"}
        </button>
      </div>

      {/* ✅ Show AI Suggestion */}
      {aiSuggestion && (
        <div style={{ marginTop: "10px", color: "#1b5e20", fontWeight: "bold" }}>
          {aiSuggestion}
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      <div className="Doante-list">
        {loading ? (
          <p>Loading donors...</p>
        ) : Doante.length > 0 ? (
          <table className="donor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Region</th>
                <th>Phone</th>
                <th>Alternate Phone</th>
                <th>Willing</th>
              </tr>
            </thead>
            <tbody>
              {Doante.map((donor, index) => (
                <tr key={index}>
                  <td>{donor.name}</td>
                  <td>{donor.bloodGroup}</td>
                  <td>{donor.Region}</td>
                  <td>{donor.phoneNumber}</td>
                  <td>{donor.AlternatePhoneNumber}</td>
                  <td>{donor.willingOrNot ? "YES" : "NO"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Donate Blood Save Life 🩸</p>
        )}
      </div>

      {showForm && (
        <form className="donor-form" onSubmit={handleAddDonor}>
          <h2>Add Donor Details</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={donor.name}
            onChange={(e) => setDonor({ ...donor, name: e.target.value })}
            required
          />
          <select
            value={donor.bloodGroup}
            onChange={(e) => setDonor({ ...donor, bloodGroup: e.target.value })}
            required
          >
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
            placeholder="Region"
            value={donor.Region}
            onChange={(e) => setDonor({ ...donor, Region: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={donor.phoneNumber}
            onChange={(e) => setDonor({ ...donor, phoneNumber: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Alternate Phone"
            value={donor.AlternatePhoneNumber}
            onChange={(e) =>
              setDonor({ ...donor, AlternatePhoneNumber: e.target.value })
            }
          />
          <div>
            <label>
              <input
                type="checkbox"
                checked={donor.willingOrNot}
                onChange={(e) =>
                  setDonor({ ...donor, willingOrNot: e.target.checked })
                }
              />
              Willing to Donate
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Add Donor
          </button>
        </form>
      )}
    </div>
  );
};

export default Home;
