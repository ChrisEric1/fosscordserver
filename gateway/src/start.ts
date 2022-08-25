process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

import { Server } from "./Server";
import { config } from "dotenv";
config();

let port = Number(process.env.PORT);
if (isNaN(port)) port = 3001;

const server = new Server({
	port,
});
server.start();
