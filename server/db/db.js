import mongoose from "mongoose";

const connectDb = async (DATABASE_URL) => {
    try {
        await mongoose.connect(DATABASE_URL, {
            dbName : "dummyCancerProject",
        });
        console.log("database connected successfully....");
    } catch (error) {
        console.log("error in connecting database");
    }
}

export default connectDb;
