/* eslint-disable no-console */
import type { Server } from "http";
import mongoose from "mongoose";
import app from "./app.js";
import { envVars } from "./app/config/env.js";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin.js";

let server: Server;
const PORT = envVars.PORT;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL);

        console.log("Connnected to MongoDB using Mongoose!!");

        server = app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log("MongoDB connection failed", error);
    }
}

(async () => {
    await startServer()
    await seedSuperAdmin()
})()

// unhandle rejection error:
process.on("unhandledRejection", (err) => {
    console.log("Undandle Rejection detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1)
})

// check unhandle rejection error:
// Promise.reject(new Error("I forgot to catch this promise"))  

process.on("uncaughtException", (err) => {
    console.log("Uncaugth Exception detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1)
})

// check Uncaugth Exception error:
// throw new Error ("I forgot to handle this local error"); 

process.on("SIGTERM", () => {
    console.log("Sigterm signal recieved... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1)
})