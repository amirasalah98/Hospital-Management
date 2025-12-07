import express from 'express'
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import patientsRouter from "./routes/patient.js";
import doctorsRouter from "./routes/doctor.js";
import appointmentsRouter from "./routes/appointment.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter)

async function startServer(){
    try{
        await mongoose.connect(process.env.mongoURI)
        console.log("MongoDB connected successfully");
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`)
        })

    }catch(error){
        console.error('MongoDB connection failed:',error)
         process.exit(1);
    }
}
startServer()
