/** @format */

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StickyHeadTable from "./pages/Datatable";
import PatientForm from "./pages/patientForm";
import LoginForm from "./pages/Login";

function App() {
  return (
    <div className="mainPage">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LoginForm />}
          />
          <Route
            path="/form"
            element={<PatientForm />}
          />
          <Route
            path="/datatable"
            element={<StickyHeadTable />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
