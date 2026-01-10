import './Header.css'
import logo from '/src/assets/tnt.png'
import userlogo from '/src/assets/userlea.svg'
const Header = () => {
  return (
    <>
        <div className="header">
            <div className="logo">
                <img src={logo} alt="TN logo" />
            </div>
            <div className="title">
                <center>
                <span>GOVERNMENT OF TAMILNADU</span>
                <span>Tamilnadu Lateral Entry District second Year B.E,/B.Tech.,Admissions - 2026</span>
                </center></div>
            <div className="userlogo">
                <img src={userlogo} alt="user" />
            </div>
        </div>
    </>
  )
}

export default Header
