import Footer from "../components/footer";
import Header from "../components/header";
import './contact.css'

function Contact(){
return(
<>
    <Header/>
    <div className="contactcontainer">
        <h1>CONTACT US</h1>
        <h3>Our Team Members:</h3>
        <div className="mem">
            <div className="name">Person</div>
            <div className="phone"><a href="tel:+91 979889194">+91 9798891949</a></div>
        </div>
        <div className="mem">
            <div className="name">Person</div>
            <div className="phone"><a href="tel:+91 9779889779">+91 9779889779</a></div>
        </div>
        <div className="mem">
            <div className="name">Person</div>
            <div className="phone"><a href="tel:+9898989898">+91 9898989898</a></div>
        </div>
        <div className="mem">
            <div className="name">Person</div>
            <div className="phone"><a href="tel:+91 9779339779">+91 9779339779</a></div>
        </div>
        <h3>Email us:</h3>
        <a href="mailto:tnleaaccet@gmail.com">tnleaaccet@gmail.com</a>
        <h3>About Us:</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aut neque voluptas cumque dolore quam architecto iste ex odio, aperiam optio sed voluptate laborum possimus! Soluta voluptas deserunt delectus. Cupiditate, necessitatibus earum. Obcaecati, iure delectus.</p>
    </div>

    <Footer/>

</>)
}
export default Contact;