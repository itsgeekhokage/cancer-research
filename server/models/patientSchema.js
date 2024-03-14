import mongoose from "mongoose";


const patientSchema = new mongoose.Schema({
    name : String,
    serialno : String,
    age : Number,
    sex : String,
    fatherName : String,
    post : String,
    district : String,
    state : String,
    typeOfTumor : String
})

const patientModel = new mongoose.model('patient', patientSchema);
export default patientModel;