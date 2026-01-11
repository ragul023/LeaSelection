import { useState } from "react";
import Countdown from "react-countdown";
import Applicationfeild from "../Components/applicationfeild";
import Header from "../Components/header";
import Footer from "../Components/Footer";
import "./Registration.css";

const Registration = () => {
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      checkPasswordRules(value);
    }
  };

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
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!/^[A-Za-z\s]{3,}$/.test(formData.name || "")) {
      newErrors.name = "Enter a valid name";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email || "")) {
      newErrors.email = "Enter a valid email";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phoneumber || "")) {
      newErrors.phoneumber = "Enter a valid mobile number";
    }

    if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
    }
    if (!Object.values(passwordRules).every(Boolean)) {
      newErrors.password = "Password does not meet all requirements";
    }
  };

  const list = [
    {
      title: "Applicant's Name",
      inputtype: "text",
      tamil: "(வின்னப்பதராரின் பெயர்)",
      id: "name",
    },
    {
      title: "Email ID",
      inputtype: "email",
      tamil: "(மின்னஞல் முகவரி)",
      id: "email",
    },
    {
      title: "Mobile number",
      inputtype: "text",
      tamil: "(கைபெசி என்)",
      id: "phoneumber",
    },
    {
      title: "Password",
      inputtype: "password",
      tamil: "(கடவுசொல்லை உல்லிடுக)",
      id: "password",
    },
    {
      title: "Confirm Password",
      inputtype: "password",
      tamil: "(கடவுசொல்லை உருதிசெய்க)",
      id: "confirmpassword",
    },
  ];
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
                date={new Date("2026-02-11T10:00:00")}
              />{" "}
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
              />
            ))}
            <center>
            <button type="submit" className="blu">
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
