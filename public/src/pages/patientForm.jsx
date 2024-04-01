/** @format */

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import typesOfCancer from "../assets/typesOfCancer";
import districts from "../assets/district";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    serialno: "",
    age: "",
    sex: "male",
    fatherName: "",
    village: "",
    post: "",
    district: "Varanasi",
    state: "Uttar Pradesh",
    typeOfTumor: "",
    pip: "",
  });
  const [districtOptions, setDistrictOptions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.state);
    if (location.state) {
      setFormData((preData) => ({
        ...preData,
        pip: location.state,
      }));
    } else {
      navigate("/");
    }
  }, [location]);

  const districtLoad = (value) => {
    let dlist = districts[value];
    setDistrictOptions(dlist);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name == "state") districtLoad(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setPatientForm();
  };

  const setPatientForm = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/patient/set`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setFormData({
        name: "",
        serialno: "",
        age: "",
        sex: "male",
        fatherName: "",
        village: "",
        post: "",
        district: "Varanasi",
        state: "Uttar Pradesh",
        typeOfTumor: "",
        pip: location.state,
      });
      toast.success("Patient data submitted successfully");
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      toast.error("unsuccessful, check your data again...");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Enter Patient Data</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="serialno">Serial No:</label>
          <input
            type="text"
            id="serialno"
            name="serialno"
            value={formData.serialno}
            onChange={handleChange}
            placeholder="Enter Serial No"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter Age"
            required
          />
        </div>
        <div className={styles.formOptionGroup}>
          <label>Sex:</label>
          <div>
            <label>
              <input
                type="radio"
                name="sex"
                value="male"
                checked={formData.sex === "male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="sex"
                value="female"
                checked={formData.sex === "female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="sex"
                value="others"
                checked={formData.sex === "others"}
                onChange={handleChange}
              />
              Others
            </label>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="fatherName">Father/Husband Name:</label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            placeholder="Enter Father's Name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="state">State:</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required>
            <option value="">Select State</option>
            {Object.keys(districts).map((state, index) => (
              <option
                key={index}
                value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="district">District:</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required>
            <option value="">Select District</option>
            {districtOptions.map((district, index) => (
              <option
                key={index}
                value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="post">Post:</label>
          <input
            type="text"
            id="post"
            name="post"
            value={formData.post}
            onChange={handleChange}
            placeholder="Enter Post"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="village">Village:</label>
          <input
            type="text"
            id="village"
            name="village"
            value={formData.village}
            onChange={handleChange}
            placeholder="Enter Village"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="typeOfTumor">Type of Tumor:</label>
          <select
            id="typeOfTumor"
            name="typeOfTumor"
            value={formData.typeOfTumor}
            onChange={handleChange}
            required>
            <option value="">Select Type of Tumor</option>
            {typesOfCancer.map((cancerType, index) => (
              <option
                key={index}
                value={cancerType}>
                {cancerType}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
