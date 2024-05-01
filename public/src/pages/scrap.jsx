/** @format */

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import styles from "./report.module.css";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#ff2828",
  "#FF8042",
  "#9966FF",
  "#33CCFF",
  "#8a8a8a",
  "#FF3399",
  "#6a7330",
  "#1a3b0a",
];

const ColorDescription = ({ item, index, activeIndex }) => {
  const color =
    activeIndex === index ? "#FF5722" : COLORS[index % COLORS.length];
  return (
    <div
      key={index}
      className={styles.colorDesc}>
      {" "}
      <span
        className={styles.colorIndicator}
        style={{ backgroundColor: color }}></span>{" "}
      {item.name}
    </div>
  );
};

const Report = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [rows, setRows] = useState([]);
  const [parameter, setParameter] = useState("district");
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
      setData(data);
      return data;
    } catch (error) {
      console.error("Error fetching patient data:", error);
      return [];
    }
  };

  const reshapeChartData = (data) => {
    console.log(data)
    let fillist = [];
    if (parameter === "district") {
      fillist = data.map((item) => item.district);
    } else {
      fillist = data.map((item) => item.typeOfTumor);
    }
    const counts = [];
    fillist.forEach((item) => {
      const existingItem = counts.find((count) => count.name === item);
      if (existingItem) {
        existingItem.value++;
      } else {
        counts.push({ name: item, value: 1 });
      }
    });

    counts.sort((a, b) => b.value - a.value);

    const top9 = counts.slice(0, 9);
    const othersCount = counts
      .slice(9)
      .reduce((sum, entry) => sum + entry.value, 0);

    if (counts.length > 9) {
      top9.push({ name: "Others", value: othersCount });
    }

    setRows(top9);
  };

  useEffect(() => {
    fetchData().then((data) => reshapeChartData(data));

  }, [parameter]);

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.page}>
      <div className={styles.filterBox}>
        <span
          onClick={() => setParameter("district")}
          className={
            parameter === "district"
              ? styles.activeSelector
              : styles.inactiveSelector
          }>
          {" "}
          District{" "}
        </span>
        <span
          onClick={() => setParameter("typeOfCancer")}
          className={
            parameter === "typeOfCancer"
              ? styles.activeSelector
              : styles.inactiveSelector
          }>
          {" "}
          Type of Cancer
        </span>
      </div>

      <div>
        <PieChart
          width={500}
          height={500}
          onMouseEnter={onPieEnter}>
          <Pie
            data={rows}
            cx={230}
            cy={230}
            innerRadius={70}
            outerRadius={150}
            fill="#8884d8"
            label={renderCustomizedLabel}
            paddingAngle={4}
            dataKey="value"
            >
            {rows.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  activeIndex === index
                    ? "#FF5722"
                    : COLORS[index % COLORS.length]
                }
              />
            ))}
          </Pie>
        </PieChart>
        <div className={styles.colorBox}>
          {rows.map((item, index) => (
            <ColorDescription
              activeIndex={activeIndex}
              item={item}
              index={index}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;
