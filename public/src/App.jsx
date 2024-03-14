/** @format */

import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StickyHeadTable from "./pages/Datatable";
import PatientForm from "./pages/patientForm";

function App() {
  return (
    <div className="mainPage">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<PatientForm />}
          />
          <Route
            path="/datatable"
            element={<StickyHeadTable />}
          />
          {/* Add more routes here if needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
