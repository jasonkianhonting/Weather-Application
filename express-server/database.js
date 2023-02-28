const { MongoClient } = require("mongodb");
const { database_name, database_collection, client_url } = require("./config");

// Function to connect this API to MongoDB databases
async function connectDatabase() {
	/**
	 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
	 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
	 */
	const client = new MongoClient(client_url);
	try {
		// Connect to the MongoDB cluster
		await client.connect();
	} catch (e) {
		console.error(e);
	}
}

// This function has been set to a limit of 50 as there are too much data to load
async function getAllData() {
	const client = new MongoClient(client_url);
	let result = "";
	try {
		if (connectDatabase()) {
			let gatherData = await client
				.db(database_name)
				.collection(database_collection)
				.find({})
				.limit(50)
				.toArray();
			result = gatherData;
		}
	} catch (e) {
		console.error(e);
	} finally {
		client.close();
		return await result;
	}
}

// This function is used to query the database to match the data required by the user by inputting the name of the city and the country code
async function queryDatabase(city, countrycode) {
	const client = new MongoClient(client_url);
	let result = "";
	try {
		if (connectDatabase()) {
			let gatherData = await client
				.db(database_name)
				.collection(database_collection)
				.aggregate([
					{
						$match: {
							"city.name": `${city}`,
							"city.country": `${countrycode}`,
						},
					},
				])
				.toArray();
			result = gatherData;
		}
	} catch (e) {
		console.error(e);
	} finally {
		client.close();
		return await result;
	}
}
module.exports = { queryDatabase, getAllData };
