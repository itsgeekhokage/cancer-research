/** @format */

import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "serialno", label: "Serial No", minWidth: 100 },
  { id: "age", label: "Age", minWidth: 100, align: "right" },
  { id: "sex", label: "Sex", minWidth: 100, align: "right" },
  { id: "fatherName", label: "Father's Name", minWidth: 170, align: "right" },
  { id: "post", label: "Post", minWidth: 100, align: "right" },
  { id: "district", label: "District", minWidth: 100, align: "right" },
  { id: "state", label: "State", minWidth: 100, align: "right" },
  { id: "typeOfTumor", label: "Type of Tumor", minWidth: 170, align: "right" },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getPatientData = async () => {
    console.log(import.meta.env.VITE_HOST_API)
    try {
      const response = await fetch(`${import.meta.env.VITE_HOST_API}/patient/get`);
      if (!response.ok) {
        throw new Error("Failed to fetch patient data");
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    getPatientData();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <h1>Data Table</h1>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table
          stickyHeader
          aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
