import "./Header.css";
import { Link } from "react-router";
import logo from "/src/assets/tnt.png";
import userlogo from "/src/assets/userlea.svg";
const Header = () => {
  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="TN logo" />
          </Link>
        </div>
        <div className="title">
          <center>
            <span>GOVERNMENT OF TAMILNADU</span>
            <span>
              Tamilnadu Lateral Entry District second Year
              B.E,/B.Tech.,Admissions - 2026
            </span>
          </center>
        </div>
        <div className="userlogo">
          <Link to={"/register"}>
            <img src={userlogo} alt="TN logo" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
