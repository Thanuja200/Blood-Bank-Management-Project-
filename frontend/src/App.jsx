
import React, { useState } from 'react';

const App = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(
      `http://localhost:5000/search?bloodGroup=${bloodGroup}&location=${location}`
    );
    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <h1>Blood Bank Search</h1>
      <input
        type="text"
        placeholder="Blood Group"
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((item) => (
          <li key={item._id}>{item.name} - {item.bloodGroup} - {item.location} - {item.contact}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
