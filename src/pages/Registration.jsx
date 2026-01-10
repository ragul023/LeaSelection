import { useState } from 'react'
import Countdown from 'react-countdown'
import Applicationfeild from '../Components/applicationfeild'
import Header from '../Components/header'
import Footer from '../Components/Footer'
import './Registration.css'

const Registration = () => {
  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span>Registration Closed</span>;
  }

  return (
    <span>
      {days}d{hours}h{minutes}m{seconds}s
    </span>
  );
};
 const[formData, setFormData] = useState({});
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const list = [
    {
      title:"Applicant's Name",
      inputtype:"text",
      tamil:"(வின்னப்பதராரின் பெயர்)"
    },
    {
      title:"Email ID", 
      inputtype:"email",
      tamil:"(மின்னஞல் முகவரி)"
    },
    {
      title:"Mobile number",
      inputtype:"text",
      tamil:"(கைபெசி என்)"
    },
    {
      title:"Password",
      inputtype:"password",
      tamil:"(கடவுசொல்லை உல்லிடுக)"
    },
    {
      title:"Confirm Password",
      inputtype:"password",
      tamil:"(கடவுசொல்லை உருதிசெய்க)"
    }
  ]
  return (

    <>
            <Header/>
            <div className="space">
                <div className="spacehead">
                        <div className="spacetitle">
                            <i class="fa-solid fa-user"></i>
                            <h3>User Registration</h3>
                            
                        </div>
                        <div className="count">
                          <p>Will be closed in<Countdown renderer={countdownRenderer} date={new Date("2026-02-11T10:00:00")}/> </p>
                        </div>


                </div>
                <div className="form">
                  <form action="">
                    {
                      list.map((item)=>(
                        <Applicationfeild key={item.index}
                         title={item.title}
                          tamil={item.tamil}
                           inputtype={item.inputtype}
                           value={formData[item.inputtype]}
                           onchange={handleChange}/>
                      ))
                    }

                  </form>
                </div>
            </div>
            <Footer/>
    </>
  )
}

export default Registration
