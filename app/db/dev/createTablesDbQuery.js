import pool from "./pool.js";
import errorHandlers from "../../helpers/errorHandlers/index.js";

/**
 * DB Query for creating tables
 * @param {object} quertText
 * @returns {object} object
 */
function query(quertText, tableName) {
	// promise - checkout a client
	pool.connect().then((client) => {
		return client
			.query(quertText)
			.then((res) => {
				client.release();
				console.log(errorHandlers.dbQuerySuccess(tableName, res));
			})
			.catch((err) => {
				client.release();
				console.err(errorHandlers.dbQueryFailed(tableName, err.stack));
			});
	});
}

export default query;
