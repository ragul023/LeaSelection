import { useEffect, useState } from "react";
import { Outlet, useNavigate, Routes, Route } from "react-router-dom";
import Details from "./details";
import Intersts from "./intersts";


const DRAFT_KEY = "myFormDraft_v1";

export default function MultiStepForm() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) { /* ignore */ }
    return {

      name: "",
      email: "",
      phone: "",
      dob: "",
      website: "",
      mark: "",
      subscribe: false,

      address: "",
      apartment: "",
      city: "",
      state: "",
      pincode: "",
      caste: "",
      marksheet: null,      // will hold File object
      secretKey: "",
      reviewLevel: 50
    };
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    try {
      // We cannot store File objects in localStorage; omit marksheet when saving draft
      const copy = { ...formData, marksheet: formData.marksheet ? { name: formData.marksheet.name } : null };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(copy));
    } catch (e) { /* ignore */ }
  }, [formData]);

  const updateForm = (patch) => {
    setFormData(prev => ({ ...prev, ...patch }));
  };

  const clearDraft = () => {
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    // reset
    setFormData({
      name: "",
      email: "",
      phone: "",
      dob: "",
      website: "",
      mark: "",
      subscribe: false,
      address: "",
      apartment: "",
      city: "",
      state: "",
      pincode: "",
      caste: "",
      marksheet: null,
      secretKey: "",
      reviewLevel: 50
    });
    setErrors({});
  };

  // ---------- Validation logic (adapted from your files) ----------
  const validateStep1 = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const urlRegex = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_.]*)?)?$/;
    const marksRegex = /^(?:1[7-9]\d|[2-5]\d{2}|600)$/; // matches 175-600-ish per your original

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (!nameRegex.test(formData.name)) newErrors.name = "Only letters and spaces allowed";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Invalid 10-digit Indian phone number";

    if (!formData.dob) newErrors.dob = "Date of Birth is required";

    if (formData.website) {
      if (!urlRegex.test(formData.website)) newErrors.website = "Invalid URL format";
    }

    if (!formData.mark && formData.mark !== 0) newErrors.mark = "Marks are required";
    else if (!marksRegex.test(String(formData.mark))) newErrors.mark = "Marks must be between 175 and 600";

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // validation helper used for step2
  const validateFieldStep2 = (name, value) => {
    const validcity = /^[a-zA-Z]+$/;
    const validAddress = /^[a-zA-Z0-9\s,.\-]+$/;
    const validPincode = /^[1-9][0-9]{5}$/;

    switch (name) {
      case 'address':
        if (!value?.trim()) return 'Address required';
        if (!validAddress.test(value)) return 'Invalid characters';
        return '';
      case 'apartment':
        if (!value?.trim()) return 'Apartment required';
        if (!validAddress.test(value)) return 'Invalid characters';
        return '';
      case 'city':
        if (!value?.trim()) return 'City required';
        if (!validcity.test(value)) return 'Only letters allowed';
        return '';
      case 'pincode':
        if (!value) return 'Pincode required';
        if (!validPincode.test(String(value))) return 'Invalid pincode';
        return '';
      case 'secretKey':
        if (!value) return 'Secret key required';
        const conditions = [
          (pwd) => pwd.length >= 8,
          (pwd) => /[a-z]/.test(pwd),
          (pwd) => /[A-Z]/.test(pwd),
          (pwd) => /\d/.test(pwd),
          (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        ];
        for (const cond of conditions) {
          if (!cond(value)) return 'Secret key does not meet requirements';
        }
        return '';
      case 'state':
        if (!value) return 'Select state';
        return '';
      case 'caste':
        if (!value) return 'Select community';
        return '';
      default:
        return '';
    }
  };

  const validateStep2 = () => {
    const fields = ['address','apartment','city','state','pincode','caste','secretKey'];
    const newErrors = {};
    for (const f of fields) {
      const err = validateFieldStep2(f, formData[f]);
      if (err) newErrors[f] = err;
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  
  const goToStep2 = () => {
    if (validateStep1()) navigate("/form/interests");
  };


  const handleFinalSubmit = async (e) => {
    e?.preventDefault?.();
   
    const ok1 = validateStep1();
    const ok2 = validateStep2();
    if (!ok1 || !ok2) return;

    setSubmitting(true);
    try {
      const payload = new FormData();

      payload.append("name", formData.name || "");
      payload.append("email", formData.email || "");
      payload.append("phone", formData.phone || "");
      payload.append("dob", formData.dob || "");
      payload.append("website", formData.website || "");
      payload.append("mark", String(formData.mark || ""));
      payload.append("subscribe", formData.subscribe ? "1" : "0");
      payload.append("address", formData.address || "");
      payload.append("apartment", formData.apartment || "");
      payload.append("city", formData.city || "");
      payload.append("state", formData.state || "");
      payload.append("pincode", String(formData.pincode || ""));
      payload.append("caste", formData.caste || "");
      payload.append("secret_key", formData.secretKey || "");
      payload.append("reviewLevel", String(formData.reviewLevel || 50));
      if (formData.marksheet) payload.append("marksheet", formData.marksheet);

      const res = await fetch("http://localhost:3000/submit", {
        method: "POST",
        body: payload

      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Server error");
      }


      clearDraft();
      console.log("Success")
    } catch (err) {
      console.error("submit error:", err);
      alert("Submit failed: " + (err.message || ""));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Routes>
      <Route path="/" element={
       
        <div />
      } />
      <Route path="details" element={
        <Details
          formData={formData}
          updateForm={updateForm}
          errors={errors}
          goToStep2={goToStep2}
        />
      } />
      <Route path="interests" element={
        <Intersts
          formData={formData}
          updateForm={updateForm}
          errors={errors}
          onSubmitFinal={handleFinalSubmit}
          submitting={submitting}
        />
      } />
    </Routes>
  );
}
