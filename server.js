import express from "express";
import "babel-polyfill";
import cors from "cors";

import { dropAllTables, createAllTables } from "./app/db/dev/dbConnection.js";

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(3000).on("listening", () => {
	console.log(`🚀 are live on ${3000}`);
});

createAllTables();
export default app;
