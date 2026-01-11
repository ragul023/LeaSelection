import './footer.css'

const Footer = () => {
  return (
    <>
    <div className="footer">
        <div className="mail">
            <center>
        <span className='icon'><i className="fa-solid fa-envelope" style={{color:"#1c274c"}} ></i>Email ID</span>
        <span>tnleaacgcet2025@gmail.com</span>
        </center>

        </div>
        <div className="address">
            <center>
            <span className='icon'><i className="fa-solid fa-house" style={{color:"#1c274c"}}></i>Address</span>
            <span>Alagappa Chettiar Government College of Engineering & Technology,<br />
                    College Road, Karaikudi - 630003, Sivagangai District</span>
                    </center>

        </div>
        
        <div className="phone">
            <center>
            <span className='icon'><i className="fa-solid fa-phone" style={{color:"#1c274c"}}></i>Contact Us</span>
            <span>9487481901, 04565-230801</span>
            </center>
        </div>
        
    </div>
    </>
  )
}

export default Footer
