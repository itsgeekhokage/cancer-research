      /** @format */

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StickyHeadTable from "./pages/Datatable";
import PatientForm from "./pages/patientForm";
import LoginForm from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Report from "./pages/Report";
import CamDataEntry from "./pages/camModel/CamDataEntry";

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
            path="/report"
            element={<Report />}
          />
          <Route
            path="/form"
            element={<PatientForm />}
          />
          <Route
            path="/datatable"
            element={<StickyHeadTable />}
          />
          <Route
            path="/cam"
            element={<CamDataEntry />}
          />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
