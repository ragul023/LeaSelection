import { Link } from "react-router-dom";
import Header from "../components/header";
import './home.css'
import Footer from "../components/footer";

function Home(){
  return(
    <>
    <Header/>
    <center>
      <div className="hero">
        <h3>WELCOME TO TNLEA REGISTER FORM</h3>
        <img src="/src/assets/Tamilnadu-Government-Color.png" alt="" height={"300px"} width={"400px"}/>
        
         <div id="but">
           <Link to='/form/details' className="but">Register</Link>
         </div>
      
      </div>
    </center>
    <Footer/>
    </>
  )
}
export default Home;