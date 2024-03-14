/** @format */

import { useState } from "react";
import styles from "./Form.module.css";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    serialno: "",
    age: "",
    sex: "",
    fatherName: "",
    post: "",
    district: "",
    state: "",
    typeOfTumor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setPatientForm();
  };

  const setPatientForm = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.HOSTLINK}/patient/get`,
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

      console.log("Patient data submitted successfully");
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
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
        <div className={styles.formGroup}>
          <label htmlFor="sex">Sex:</label>
          <input
            type="text"
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            placeholder="Enter Sex"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="fatherName">Father Name:</label>
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
          <label htmlFor="district">District:</label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="Enter District"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter State"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="typeOfTumor">Type of Tumor:</label>
          <input
            type="text"
            id="typeOfTumor"
            name="typeOfTumor"
            value={formData.typeOfTumor}
            onChange={handleChange}
            placeholder="Enter Type of Tumor"
            required
          />
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
