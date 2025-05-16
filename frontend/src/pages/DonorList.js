import { useEffect, useState } from "react";
import API from "../api/axiosInstance";

const DonorList = () => {
    const [donors, setDonors] = useState([]);

    useEffect(() => {
        API.get("/donors")
            .then((res) => setDonors(res.data))
            .catch((err) => console.error(err));
    }, []);         

    return (
        <div>
            <h2>Available Donors</h2>
            <h1>{donors}</h1>
            <ul>
                {donors.map((donor) => (
                    <li key={donor._id}>{donor.name} - {donor.bloodGroup}</li>
                ))}
            </ul>
        </div>
    );
};

export default DonorList;
