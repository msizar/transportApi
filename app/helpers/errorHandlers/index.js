const errorMessages = {
	/**
	 * @param res
	 */
	dbConnected: (res) => {
		return `${res ? res.database : ""} db connected 😅😅😅`;
	},

	/**
	 * @param err
	 */
	dbConnectionFailed: (err) => {
		return `connected to the db 🚫🚫🚫 : ${err || ""}`;
	},

	/**
	 * @param tableName
	 * @param res
	 */
	dbQuerySuccess: (tableName, res) => {
		return `${tableName || ""} query executed 🙌: ${
			JSON.stringify(res) || "[]"
		}`;
	},

	/**
	 * @param tableName
	 * @param res
	 */
	dbQueryFailed: (tableName, err) => {
		return `query on ${tableName || ""} table, could not be executed 🛑: ${
			JSON.stringify(err) || "[]"
		}`;
	},
};
export default errorMessages;
