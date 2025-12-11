

import Header from "../components/header";
import Footer from "../components/footer";
import "./display.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";



function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }); 
}



function Displaycont({ item }) {
  return (
    <div className="row">
      <div className="lable">{item.label} :</div>
      <div className="value">{item.value}</div>
    </div>
  );
}



function Display() {
  const [detail, setDetail] = useState({});
  const { state } = useLocation();
  const userid = state.userid;

  const apibase = "http://localhost:3000";

  useEffect(() => {
    fetch(`${apibase}/registrations/${userid}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.ok) {
          setDetail(result.data);
        }
      });
  }, [userid]);

  const detailList = [
    { key: "name", label: "Student Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone Number" },
    { key: "dob", label: "Date of Birth", format: formatDate },

  ];


  const mappedDetails = detailList
    .map((item) => {
      const value = detail[item.key];
      if (value === null || value === undefined || value === "") return null;

      return {
        label: item.label,
        value: item.format ? item.format(value) : value, 
      };
    })
    .filter(Boolean); // remove empty fields

  // -------------------------------------------------------

  return (
    <>
      <Header />

      <div className="form1">
        {mappedDetails.map((item, index) => (
          <Displaycont key={index} item={item} />
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Display;
