import patientModel from "../models/patientSchema.js";


const getAllPatientData = async (req, res) => {
    try {
        const data = await patientModel.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error." });
    }
};

const setPatientData = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: "Data is required." });
        }

        const doc = new patientModel(data);
        await doc.save();

        return res.status(200).json({ message: "Patient data saved successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}


export { getAllPatientData, setPatientData };