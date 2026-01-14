import './Home.css'
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Navigate,Link, useNavigate } from 'react-router';

const Home = () => {
    
  return (
    <>
      <Header />
        <div className="top">
            <div className="notificationcenter">
                <h3>NOTIFICATIONS</h3>
                <div className="marqee">
                    <ul>
                        <li><img src="./src/assets/bullet.svg" width="20" height="20" alt="link"/>  This is done By Applicant</li>
                        <li><img src="./src/assets/bullet.svg" width="20" height="20" alt="link"/>  Just an Clone TNLEA </li>
                        <li><img src="./src/assets/bullet.svg" width="20" height="20" alt="link"/>  TNLEA @2026</li>
                        <li><img src="./src/assets/bullet.svg" width="20" height="20" alt="link"/>  This is done By Applicant</li>
                        <li><img src="./src/assets/bullet.svg" width="20" height="20" alt="link"/>  Just an Clone TNLEA </li>
                        <li><img src="./src/assets/bullet.svg" width="20" height="20" alt="link"/>  TNLEA @2026</li>
                    </ul>
                </div>
            </div>
                        <div className="quicklink">
                <h3>QUICK LINKS</h3>
                    <ul className="quicklinklist" >
                        <li><a href="www.facebook.com">Hello</a></li>
                        <li><a href="http://hello.com"  rel="noopener noreferrer">Hello</a></li>
                        <li><a href="www.instagram.com">Hello</a></li>
                        <li><a href="www.twitter.com">Hello</a></li>
                        <li><a href="www.facebook.com">Hello</a></li>
                        <li><a href="www.facebook.com">Hello</a></li>
                        <li><a href="http://hello.com"  rel="noopener noreferrer">Hello</a></li>
                        <li><a href="www.instagram.com">Hello</a></li>
                        <li><a href="www.twitter.com">Hello</a></li>
                        <li><a href="www.facebook.com">Hello</a></li>
                    </ul>
            </div>
        </div>
        <div className="hom">
            <div className="links"><Link to ="/register"><img src="./src/assets/userlea.svg" alt="" />User Login</Link></div>
            <div className="links"><Link to ="/register"><img src="./src/assets/userlea.svg" alt="" />View Registeration</Link></div>
            <div className="links"><Link to ="/register"><img src="./src/assets/userlea.svg" alt="" />View Users</Link></div>
        </div>
      <Footer />
    </>
  );
};

export default Home;
