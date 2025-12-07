import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <div className="hdr">
        <div className="logo">
          <Link to="/" className="logo">TNLEA FORM</Link>
        </div>

        <div className="navlinks">
          <Link to="/form/details" className="li">Basic Registration</Link>
          <Link to="/cnt" className="li">Contact</Link>
        </div>
      </div>
    </>
  );
}

export default Header;
