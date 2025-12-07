import Header from "../components/header";
import Footer from "../components/footer";
import './details.css';
import { useNavigate } from "react-router-dom";

function Details({ formData, updateForm, errors, goToStep2 }) {
  // handleChange now calls parent updateForm
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "phone") {
      const filteredValue = value.replace(/\D/g, '');
      updateForm({ [name]: filteredValue });
    } else if (name === "name") {
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
      updateForm({ [name]: filteredValue });
    } else if (type === "checkbox") {
      updateForm({ [name]: checked });
    } else {
      updateForm({ [name]: value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // parent validation is called via goToStep2
    goToStep2();
  };

  return (
    <>
      <Header />
      <div className="form1">
        <h2>REGISTRATION FORM</h2>
        <form onSubmit={onSubmit} noValidate>
          <div className="feild">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors?.name && <small className="errore">{errors.name}</small>}
          </div>

          <div className="feild">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors?.email && <small className="errore">{errors.email}</small>}
          </div>

          <div className="feild">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Enter Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              maxLength="10"
            />
            {errors?.phone && <small className="errore">{errors.phone}</small>}
          </div>

          <div className="feild">
            <label htmlFor="dob">Choose Your DOB:</label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors?.dob && <small className="errore">{errors.dob}</small>}
          </div>

          <div className="feild">
            <label htmlFor="website">Enter Your College Link:</label>
            <input
              type="url"
              name="website"
              id="website"
              placeholder="www.Yourcollege.com"
              value={formData.website}
              onChange={handleChange}
            />
            {errors?.website && <small className="errore">{errors.website}</small>}
          </div>

          <div className="feild">
            <label htmlFor="mark">Enter Your Marks:</label>
            <input
              type="number"
              name="mark"
              id="mark"
              min={175}
              max={600}
              placeholder="Marks"
              value={formData.mark}
              onChange={handleChange}
            />
            {errors?.mark && <small className="errore">{errors.mark}</small>}
          </div>

          <div className="feildcheck">
            <label>
              <input
                type="checkbox"
                name="subscribe"
                id="subscribe"
                checked={!!formData.subscribe}
                onChange={handleChange}
              /> Subscribe to Our Newsletter
            </label>
          </div>

          <button className="btn" type="submit">Next →</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Details;
