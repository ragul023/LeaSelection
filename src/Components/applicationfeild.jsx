import "./application.css";

const Applicationfeild = ({
  title,
  inputtype,
  tamil,
  onChange,
  value,
  id,
  error,
  passwordRules,
  placeholder,
}) => {
  return (
    <>
      <div className="feild">
        <div className="det">
          {title} <br />
          <span>{tamil}</span>
        </div>

        <div className="input-wrap">
          <input
            className={`next ${error ? "error" : ""}`}
            type={inputtype}
            value={value}
            id={id}
            autoComplete={id}
            onChange={(e) => onChange(id, e.target.value)}
            placeholder={placeholder}
          />

          {id === "password" && passwordRules && (
            <ul className="password-rules">
              <li className={passwordRules.length ? "valid" : ""}>
                Minimum 8 characters
              </li>
              <li className={passwordRules.uppercase ? "valid" : ""}>
                One uppercase letter
              </li>
              <li className={passwordRules.lowercase ? "valid" : ""}>
                One lowercase letter
              </li>
              <li className={passwordRules.number ? "valid" : ""}>
                One number
              </li>
              <li className={passwordRules.special ? "valid" : ""}>
                One special character
              </li>
            </ul>
          )}

          {error && <p className="error-text">{error}</p>}
        </div>
      </div>
    </>
  );
};
export default Applicationfeild;
