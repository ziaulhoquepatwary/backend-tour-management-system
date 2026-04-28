import type { Server } from "http";
import mongoose from "mongoose";
import app from "./app.js";

let server: Server;
const PORT = 5000;

const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://tour-management:jIBaKPb6uD494iVB@cluster0.kogn06a.mongodb.net/tourManagementDB?appName=Cluster0");

        console.log("Connnected to MongoDB using Mongoose!!");

        server = app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log("MongoDB connection failed", error);
    }
}

startServer();