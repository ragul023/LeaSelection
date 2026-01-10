
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
  const list = [
    {
      title:"Applicant's Name",
      inputtype:"text"
    },
    {
      title:"Email ID", 
      inputtype:"email"
    },
    {
      title:"Mobile number",
      inputtype:"text"
    },
    {
      title:"Password",
      inputtype:"password"
    },
    {
      title:"Confirm Password",
      inputtype:"password"
    },
        {
      title:"Confirm Password",
      inputtype:"password"
    },
        {
      title:"Confirm Password",
      inputtype:"password"
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
                        <Applicationfeild key={item.index} title={item.title} inputtype={item.inputtype}/>
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
