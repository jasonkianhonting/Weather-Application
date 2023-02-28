//This file is used to store all the environment variables used in this express API
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
	port: process.env.PORT,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	cluster_url: process.env.CLUSTER_URL,
	database_name: process.env.DATABASE_NAME,
	database_collection: process.env.DATABASE_COLLECTION,
	client_url: process.env.CLIENT_URL,
};
