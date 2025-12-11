import Header from "../components/header";
import Footer from "../components/footer";
function Display(){
return(
    <>
        <Header/>
    
        <div className="form1">
            <div className="">
                <div className="lable">Strudent Name:</div>
                <div className="value"></div>
            </div>
            <div className="">
                <div className="lable">Strudent Email:</div>
                <div className="value"></div>
            </div>
            <div className="">
                <div className="lable">Strudent DOB:</div>
                <div className="value"></div>
            </div>
            <div className="">
                <div className="lable">Strudent Mark</div>
                <div className="value"></div>
            </div><div className="">
                <div className="lable">Strudent Caste:</div>
                <div className="value"></div>
            </div>
            <div className="">
                <div className="lable">Strudent Phone Number:</div>
                <div className="value"></div>
            </div>
            
        </div>
    <Footer/>    
    </>
)
}
export default Display;