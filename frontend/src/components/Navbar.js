import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <h2>Blood Bank</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/donors">Find Donors</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
