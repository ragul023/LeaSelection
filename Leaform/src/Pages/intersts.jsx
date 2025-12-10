import Header from "../components/header";
import Footer from "../components/footer";
import './interst.css';

function Intersts({ formData, updateForm, errors, onSubmitFinal, submitting }) {
  const conditions = [
    { label: "At least 8 characters", test: (pwd) => pwd.length >= 8 },
    { label: "Contains lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
    { label: "Contains uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
    { label: "Contains number", test: (pwd) => /\d/.test(pwd) },
    { label: "Contains special character", test: (pwd) => /[!@#$%^&*(),.?\":{}|<>]/.test(pwd) },
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      updateForm({ [name]: files[0] || null });
    } else {
      updateForm({ [name]: value });
    }
  };


  const isFormValid = () => {

    const requiredFields = ['address', 'apartment', 'city', 'state', 'pincode', 'caste', 'secretKey'];
    for (const field of requiredFields) {
      if (!formData[field]) return false;
      if (errors && errors[field]) return false;
    }

    for (const condition of conditions) {
      if (!condition.test(formData.secretKey || "")) return false;
    }
    return true;
  };

  return (
    <>
      <Header />
      <div className="form1">
        <h2>PERSONAL DETAILS</h2>
        <form onSubmit={onSubmitFinal}>

          <div className="feild">
            <label htmlFor="address">Enter Your Address:</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter Your Address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors?.address && <small className="errore">{errors.address}</small>}
          </div>

          <div className="feild">
            <label htmlFor="apartment">Enter Your Apartment, Street :</label>
            <input
              type="text"
              name="apartment"
              id="apartment"
              placeholder="Apartment Name"
              value={formData.apartment}
              onChange={handleChange}
            />
            {errors?.apartment && <small className="errore">{errors.apartment}</small>}
          </div>

          <div className="feild">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Enter Your City"
              value={formData.city}
              onChange={handleChange}
            />
            {errors?.city && <small className="errore">{errors.city}</small>}
          </div>

          <div className="feild">
            <label htmlFor="state">Enter Your State:</label>

            <select
              name="state"
              id="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select a state</option>
              <option value="AP">Andhra Pradesh</option>
              <option value="AR">Arunachal Pradesh</option>
              <option value="AS">Assam</option>
              <option value="BR">Bihar</option>
              <option value="CT">Chhattisgarh</option>
              <option value="GA">Goa</option>
              <option value="GJ">Gujarat</option>
              <option value="HR">Haryana</option>
              <option value="HP">Himachal Pradesh</option>
              <option value="JK">Jammu and Kashmir</option>
              <option value="JH">Jharkhand</option>
              <option value="KA">Karnataka</option>
              <option value="KL">Kerala</option>
              <option value="MP">Madhya Pradesh</option>
              <option value="MH">Maharashtra</option>
              <option value="MN">Manipur</option>
              <option value="ML">Meghalaya</option>
              <option value="MZ">Mizoram</option>
              <option value="NL">Nagaland</option>
              <option value="OR">Odisha</option>
              <option value="PB">Punjab</option>
              <option value="RJ">Rajasthan</option>
              <option value="SK">Sikkim</option>
              <option value="TN">Tamil Nadu</option>
              <option value="TG">Telangana</option>
              <option value="TR">Tripura</option>
              <option value="UT">Uttarakhand</option>
              <option value="UP">Uttar Pradesh</option>
              <option value="WB">West Bengal</option>
              <option value="AN">Andaman and Nicobar Islands</option>
              <option value="CH">Chandigarh</option>
              <option value="DN">Dadra and Nagar Haveli and Daman and Diu</option>
              <option value="DL">Delhi</option>
              <option value="LD">Lakshadweep</option>
              <option value="PY">Puducherry</option>
            </select>
            {errors?.state && <small className="errore">{errors.state}</small>}
          </div>

          <div className="feild">
            <label htmlFor="pincode">Pincode:</label>
            <input
              type="number"
              name="pincode"
              id="pincode"
              placeholder="Enter 6-digit pincode"
              min="100000"
              max="999999"
              value={formData.pincode}
              onChange={handleChange}
            />
            {errors?.pincode && <small className="errore">{errors.pincode}</small>}
          </div>

          <div className="feild-radio">
            <label>Choose Your Community</label>
            <div className="radio">
              <input
                type="radio"
                name="caste"
                id="bc"
                value="BC"
                checked={formData.caste === 'BC'}
                onChange={handleChange}
              />
              <label htmlFor="bc">BC</label>
              <input
                type="radio"
                name="caste"
                id="mbc"
                value="MBC"
                checked={formData.caste === 'MBC'}
                onChange={handleChange}
              />
              <label htmlFor="mbc">MBC</label>
              <input
                type="radio"
                name="caste"
                id="scst"
                value="SC/ST"
                checked={formData.caste === 'SC/ST'}
                onChange={handleChange}
              />
              <label htmlFor="scst">SC/ST</label>
              <input
                type="radio"
                name="caste"
                id="others"
                value="Others"
                checked={formData.caste === 'Others'}
                onChange={handleChange}
              />
              <label htmlFor="others">Others</label>
            </div>
            {errors?.caste && <small className="errore">{errors.caste}</small>}
          </div>

          <div className="feild">
            <label htmlFor="marksheet">Upload Your Diploma Marksheet:</label>
            <input
              type="file"
              name="marksheet"
              id="marksheet"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => updateForm({ marksheet: e.target.files[0] || null })}
            />
          </div>

          <div className="feild">
            <label htmlFor="secretKey">Enter Your Secret Key</label>
            <input
              type="password"
              name="secretKey"
              id="secretKey"
              placeholder="Min 8 chars with special characters"
              value={formData.secretKey}
              onChange={handleChange}
            />
            {errors?.secretKey && <small className="errore">{errors.secretKey}</small>}

            <ul className="password-conditions">
              {conditions.map((cond) => {
                const passed = cond.test(formData.secretKey || "");
                return (
                  <li
                    key={cond.label}
                    style={{ color: passed ? 'green' : 'red', fontSize: '12px' }}
                  >
                    {cond.label}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="feild">
            <label htmlFor="reviewRange">Choose Your Review Level: {formData.reviewLevel}</label>
            <input
              type="range"
              id="reviewRange"
              name="reviewLevel"
              min="0"
              max="100"
              value={formData.reviewLevel}
              onChange={(e) => updateForm({ reviewLevel: e.target.value })}
            />
          </div>

          <button type="submit" className="btnn" disabled={!isFormValid() || submitting}>
            {submitting ? "Sending..." : "Register"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Intersts;
