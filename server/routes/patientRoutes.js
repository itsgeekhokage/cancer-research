import express from "express";
import { getAllPatientData, setPatientData } from "../controllers/patientController.js";

const router = express.Router();

router.get('/get', getAllPatientData);
router.post('/set', setPatientData);

export default router;