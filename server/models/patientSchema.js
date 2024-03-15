import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    serialno: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    sex: {
        type: String,
        required: true,
        enum: ['male', 'female', 'others']
    },
    fatherName: {
        type: String,
        required: true,
        trim: true
    },
    post: {
        type: String,
        required: true,
        trim: true
    },
    district: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    typeOfTumor: {
        type: String,
        required: true,
        trim: true
    },
    pip: {
        type: String,
        required : true,
        trim: true
    }
});

const patientModel = mongoose.model('Patient', patientSchema);
export default patientModel;
