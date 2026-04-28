import type { Server } from "http";
import app from "./app.js";

let server: Server;
const PORT = 5000;

const startServer = async () => {
    server = app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    })
}

startServer();