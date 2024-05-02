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

const All = ({ data, setCancerList }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [rows, setRows] = useState([]);
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  console.log(rows);
  useEffect(() => {
    const fillist = data.map((item) => item.district);
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
    const namelist = top9.map((item) => item.name);
    setCancerList(namelist);
  }, []);
  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <h3 className={styles.selectionPanelHeading}>
        {"Pie Chart showing the distribution of various kind of Cancers "}
      </h3>
      <div className={styles.chartArea}>
        <PieChart
          width={500}
          height={500}>
          <Pie
            data={rows}
            cx={230}
            cy={230}
            innerRadius={70}
            outerRadius={150}
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
            paddingAngle={4}
            dataKey="value">
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

const DistrictGraph = ({ data, district }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [rows, setRows] = useState([]);
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  useEffect(() => {
    data = data?.filter((item) => item.district === district);
    const fillist = data.map((item) => item.typeOfTumor);
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
  }, [district]);
  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <h3 className={styles.selectionPanelHeading}>
        {"Pie Chart showing the distribution of cancers across in "} {district}
      </h3>
      <div className={styles.chartArea}>
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
            labelLine={false}
            paddingAngle={4}
            dataKey="value">
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
    </>
  );
};

const GenderGraph = ({ data, district }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [rows, setRows] = useState([]);
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  console.log(rows);
  useEffect(() => {
    data = data.filter((item) => item.district === district);
    const fillist = data.map((item) => item.sex);

    console.log(fillist);

    const { male, female } = fillist.reduce(
      (acc, sex) => {
        if (sex === "male") {
          acc.male++;
        } else if (sex === "female") {
          acc.female++;
        }
        return acc;
      },
      { male: 0, female: 0 }
    );

    setRows([
      { name: "Male", value: male },
      { name: "Female", value: female },
    ]);
  }, [district]);
  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };
  return (
    <div>
      <h3 className={styles.selectionPanelHeading}>
        {"Pie Chart showing the distribution of cancers in"} {district}{" "}
        {"across various genders"}
      </h3>
      <div className={styles.chartArea}>
        <PieChart
          width={500}
          height={500}>
          <Pie
            data={rows}
            cx={230}
            cy={230}
            innerRadius={70}
            outerRadius={150}
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
            paddingAngle={4}
            dataKey="value">
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

const AgeGraph = ({ data, district }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [rows, setRows] = useState([]);
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  console.log(rows);
  useEffect(() => {
    data = data.filter((item) => item.district === district);
    const fillist = data.map((item) => item.age);

    const { ten, twenty, thirty, forty, fifty, sixty, seventy, eighty } =
      fillist.reduce(
        (acc, age) => {
          if (age <= 10) {
            acc.ten++;
          } else if (age <= 20) {
            acc.twenty++;
          } else if (age <= 30) {
            acc.thirty++;
          } else if (age <= 40) {
            acc.forty++;
          } else if (age <= 50) {
            acc.fifty++;
          } else if (age <= 60) {
            acc.sixty++;
          } else if (age <= 70) {
            acc.seventy++;
          } else if (age <= 80) {
            acc.eighty++;
          }
          return acc;
        },
        {
          ten: 0,
          twenty: 0,
          thirty: 0,
          forty: 0,
          fifty: 0,
          sixty: 0,
          seventy: 0,
          eighty: 0,
        }
      );

    let temprows = [
      { name: "0-10", value: ten },
      { name: "11-20", value: twenty },
      { name: "21-30", value: thirty },
      { name: "31-40", value: forty },
      { name: "41-50", value: fifty },
      { name: "51-60", value: sixty },
      { name: "61-70", value: seventy },
      { name: "71-80", value: eighty },
    ];
    temprows = temprows.filter((item) => item.value != 0);
    setRows(temprows);
  }, [district]);

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };
  return (
    <div>
      <h3 className={styles.selectionPanelHeading}>
        {"Pie Chart showing the distribution of cancers in "} {district}{" "}
        {" across various age groups"}
      </h3>
      <div className={styles.chartArea}>
        <PieChart
          width={500}
          height={500}>
          <Pie
            data={rows}
            cx={230}
            cy={230}
            innerRadius={70}
            outerRadius={150}
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
            paddingAngle={4}
            dataKey="value">
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

const DistrictPanel = ({ data, setPanel }) => {
  const [cancerList, setCancerList] = useState([]);
  const [selection, setSelection] = useState("all");
  return (
    <div className={styles.fullPanel}>
      <div className={styles.sideBar}>
        <span
          className={styles.sidebarButton}
          onClick={() => setPanel("")}>
          Back
        </span>
        <span
          className={styles.sidebarButton}
          onClick={() => setSelection("all")}>
          All
        </span>
        {cancerList.slice(0,9)?.map((item, ind) => (
          <span
            className={styles.sidebarButton}
            onClick={() => setSelection(item)}>
            {item}
          </span>
        ))}
      </div>
      {selection == "all" && (
        <All
          data={data}
          setCancerList={setCancerList}
        />
      )}
      {selection != "all" && (
        <div className={styles.selectionPanel}>
          {" "}
          <h2 className={styles.selectionPanelMainHeading}>{selection} </h2>
          <DistrictGraph
            district={selection}
            data={data}
          />{" "}
          <GenderGraph
            district={selection}
            data={data}
          />{" "}
          <AgeGraph
            district={selection}
            data={data}
          />{" "}
        </div>
      )}
    </div>
  );
};

export default DistrictPanel;
