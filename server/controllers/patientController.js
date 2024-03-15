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

        // Create a new document with the input data
        const doc = new patientModel(data);

        // Validate the document synchronously
        const validationError = doc.validateSync();

        if (validationError) {
            console.log(validationError.message);
            return res.status(400).json({ error: validationError.message });
        }

        // Save the document to the database
        await doc.save();

        return res.status(200).json({ message: "Patient data saved successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};


export { getAllPatientData, setPatientData };