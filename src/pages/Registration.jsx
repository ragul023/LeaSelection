import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Applicationfeild from "../Components/applicationfeild";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./Registration.css";
import { useNavigate } from "react-router";

const Registration = () => {
  const [activeField, setActiveField] = useState(null);
  const navigate = useNavigate();
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const validators = {
  name: {
    regex: /^[A-Za-z\s]{3,}$/,
    message: "Enter a valid name",
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Enter a valid email",
  },
  mobilenumber: {
    regex: /^[6-9]\d{9}$/,
    message: "Enter a valid mobile number",
  },
};

  const checkPasswordRules = (password) => {
    setPasswordRules({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const [formData, setFormData] = useState({});

const handleChange = (name, value) => {
  setActiveField(name);

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  if (name === "password") {
    checkPasswordRules(value);
  }
};
useEffect(() => {
  if (!activeField) return;

  const currentIndex = fieldIndexMap[activeField];

  setErrors((prevErrors) => {
    const newErrors = { ...prevErrors };
    // const newErrors = prevErrors;

   
    for (let i = 0; i < currentIndex; i++) {
      const prevFieldId = list[i].id;

      if (!formData[prevFieldId]?.trim()) {
  newErrors[prevFieldId] = "Required";
} else {
  
  if (newErrors[prevFieldId] === "Required") {
    newErrors[prevFieldId] = "";
  }
}
    }


    if (validators[activeField]) {
      if (!validators[activeField].regex.test(formData[activeField] || "")) {
        newErrors[activeField] = validators[activeField].message;
      } else {
        newErrors[activeField] = "";
      }
    }


    if (activeField === "confirmpassword") {
      if (formData.confirmpassword !== formData.password) {
        newErrors.confirmpassword = "Passwords do not match";
      } else {
        newErrors.confirmpassword = "";
      }
    }

    return newErrors;
  });
}, [formData, activeField]);




  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Registration Closed</span>;
    }

    return (
      <span>
        {days}d {hours}h {minutes}m {seconds}s
      </span>
    );
  };
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors={};

    if (Object.values(errors).some(Boolean)) return;


    if (!Object.values(passwordRules).every(Boolean)) {
      newErrors.password = "Password does not meet all requirements";
    }

    setErrors(newErrors);



    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobilenumber: formData.mobilenumber,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("API success:", data);
      alert("Registration successful!");
      setFormData({});
      setErrors({});
      setPasswordRules({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
      });
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.error("API error:", error.message);
      alert(error.message);
    }
  };

  const list = [
    {
      title: "Applicant's Name",
      inputtype: "text",
      tamil: "(வின்னப்பதராரின் பெயர்)",
      id: "name",
      placeholder:"Enter Applicants Name"
    },
    {
      title: "Email ID",
      inputtype: "email",
      tamil: "(மின்னஞல் முகவரி)",
      id: "email",
      placeholder:"Enter Applicants Email"
    },
    {
      title: "Mobile number",
      inputtype: "text",
      tamil: "(கைபெசி என்)",
      id: "mobilenumber",
      placeholder:"Enter Applicants MobileNumber"
    },
    {
      title: "Password",
      inputtype: "password",
      tamil: "(கடவுசொல்லை உல்லிடுக)",
      id: "password",
      placeholder:"Enter Your Password"
    },
    {
      title: "Confirm Password",
      inputtype: "password",
      tamil: "(கடவுசொல்லை உருதிசெய்க)",
      id: "confirmpassword",
      placeholder:"Confirm Your Password"
    },
  ];
const fieldIndexMap = list.reduce((acc, item, index) => {
  acc[item.id] = index;
  return acc;
}, {});

  return (
    <>
      <Header />
      <div className="space">
        <div className="spacehead">
          <div className="spacetitle">
            <i className="fa-solid fa-user"></i>
            <h3>User Registration</h3>
          </div>
          <div className="count">
            <p>
              Will be closed in
              <Countdown
                renderer={countdownRenderer}
                date={new Date("2026-02-21T10:00:00")}
              />
            </p>
          </div>
        </div>
        <div className="form">
          <form action="" onSubmit={handleSubmit}>
            {list.map((item) => (
              <Applicationfeild
                key={item.id}
                id={item.id}
                title={item.title}
                tamil={item.tamil}
                inputtype={item.inputtype}
                value={formData[item.id] || ""}
                onChange={handleChange}
                error={errors[item.id]}
                passwordRules={item.id === "password" ? passwordRules : null}
                placeholder={item.placeholder}
              />
            ))}
            <center>
              <button
                className="blu"
                type="submit"
                disabled={!Object.values(passwordRules).every(Boolean)}
              >
                Register
              </button>
            </center>
          </form>
        </div>
      </div>
      {console.log(formData)}

      <Footer />
    </>
  );
};

export default Registration;
