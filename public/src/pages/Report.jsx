/** @format */

import React, { useEffect, useState } from "react";
import styles from "./report.module.css";
import TypePanel from "./TypePanel";
import DistrictPanel from "./DistrictPanel";

const Report = () => {
  const [panel, setPanel] = useState("");
   const [data, setData] = useState([]);

   const fetchData = async () => {
     try {
       const response = await fetch(
         `${import.meta.env.VITE_HOST_API}/patient/get`
       );
       if (!response.ok) {
         throw new Error("Failed to fetch patient data");
       }
       const data = await response.json();
       if(data) setData(data);
     } catch (error) {
       console.error("Error fetching patient data:", error);
       return [];
     }
   };
   useEffect(()=>{
    fetchData();
   }, [])

  return (
    <div className={styles.page}>
      {panel == "" && (
        <>
          <div className={styles.welcomeHeading}>
            Exploring Cancer Insights: <br></br> Welcome to Our Analysis Portal
          </div>
          <div className={styles.mainButtonSection}>
            <button
              className={styles.button}
              onClick={() => setPanel("typesOfCancer")}>
              Types Of Cancer
            </button>
            <button
              className={styles.button}
              onClick={() => setPanel("district")}>
              District
            </button>
          </div>
        </>
      )}
      {panel == "typesOfCancer" && <TypePanel data={data} setPanel={setPanel} />}
      {panel == "district" && <DistrictPanel data={data} setPanel/>}
    </div>
  );
};

export default Report;
