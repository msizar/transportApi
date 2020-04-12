import pool from "./pool.js";
import dbQuery from "./createTablesDbQuery.js";
import errorHandler from "../../helpers/errorHandlers/index.js";

pool.on("connect", (res, err) => {
	if (err) {
		console.log(errorHandler.dbConnectionFailed(err));
		return;
	}
	console.log(errorHandler.dbConnected(res));
});

/**
 * Create User Table
 * CREATE TABLE test
  (id SERIAL PRIMARY KEY, 
  name VARCHAR(100) UNIQUE NOT NULL, 
  phone VARCHAR(100));
 */
const createUserTable = () => {
	const tableName = "users";
	const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
	(id SERIAL PRIMARY KEY, 
	email VARCHAR(100) UNIQUE NOT NULL, 
	first_name VARCHAR(100), 
	last_name VARCHAR(100), 
	password VARCHAR(100) NOT NULL,
	created_on DATE NOT NULL)`;

	dbQuery(userCreateQuery, tableName);
};

/**
 * Create Buses Table
 */
const createBusTable = () => {
	const tableName = "bus";
	const busCreateQuery = `CREATE TABLE IF NOT EXISTS bus
    (id SERIAL PRIMARY KEY,
    number_plate VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year VARCHAR(10) NOT NULL,
    capacity integer NOT NULL,
    created_on DATE NOT NULL)`;

	dbQuery(busCreateQuery, tableName);
};

/**
 * Create Trip Table
 */
const createTripTable = () => {
	const tableName = "trip";
	const tripCreateQuery = `CREATE TABLE IF NOT EXISTS trip
    (id SERIAL PRIMARY KEY, 
    bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE,
    origin VARCHAR(300) NOT NULL, 
    destination VARCHAR(300) NOT NULL,
    trip_date DATE NOT NULL,
    fare float NOT NULL,
    status float DEFAULT(1.00),
    created_on DATE NOT NULL)`;

	dbQuery(tripCreateQuery, tableName);
};

/**
 * Create Booking Table
 */
const createBookingTable = () => {
	const tableName = "booking";
	const bookingCreateQuery = `CREATE TABLE IF NOT EXISTS booking(id SERIAL, 
    trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE,
    trip_date DATE, 
    seat_number INTEGER UNIQUE,      
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,      
    created_on DATE NOT NULL,
    PRIMARY KEY (id, trip_id, user_id))`;

	dbQuery(bookingCreateQuery, tableName);
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
	const usersDropQuery = "DROP TABLE IF EXISTS users";
	const tableName = "trip";
	dbQuery(usersDropQuery, tableName);
};

/**
 * Drop Bus Table
 */
const dropBusTable = () => {
	const busDropQuery = "DROP TABLE IF EXISTS bus";
	const tableName = "bus";
	dbQuery(busDropQuery, tableName);
};

/**
 * Drop Trip Table
 */
const dropTripTable = () => {
	const tripDropQuery = "DROP TABLE IF EXISTS trip";
	const tableName = "trip";
	dbQuery(tripDropQuery, tableName);
};

/**
 * Drop Bus Table
 */
const dropBookingTable = () => {
	const bookingDropQuery = "DROP TABLE IF EXISTS booking";
	const tableName = "booking";
	dbQuery(bookingDropQuery, tableName);
};

/**
 * Create All Tables
 */
const createAllTables = () => {
	console.log("creating tables 📂📂📂📂📂");
	createUserTable();
	createBusTable();
	createTripTable();
	createBookingTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
	console.log("dropping tables 🚁🚁🚁🚁🚁");
	dropUserTable();
	dropBusTable();
	dropTripTable();
	dropBookingTable();
};

const test = () => {
	console.log("see we testing");
};

pool.on("remove", () => {
	console.log("client removed");
	process.exit(0);
});

export { createAllTables, dropAllTables, test };

import "make-runnable";
