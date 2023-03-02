const { port } = require("./config");
const { queryDatabase, getAllData, queryCity } = require("./database");
const { uppercaseCity, uppercaseCountryCode } = require("./helpers");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

app.use(helmet());

// Default route to get all weather data although it is capped to 50 results for performance purposes
app.get("/", async (req, res) => {
	let result = await getAllData();
	if (result === null || result.length === 0 || result === "") {
		res
			.status(500)
			.send({ error: true, message: "Please contact your administrator" });
	} else {
		res.status(200).send({ result });
	}
});

// Route to get weather data from specific city and country
app.get("/:country/:countrycode", async (req, res) => {
	let country = uppercaseCity(req.params.country);
	let countryCode = uppercaseCountryCode(req.params.countrycode);
	let result = await queryDatabase(country, countryCode);
	if (result.length === 0 || result === null || result === "") {
		res.status(400).send({
			error: true,
			message:
				"Please make sure your city and country code are valid. Refer to city-list.json for references",
		});
	} else {
		res.status(200).send({ result });
	}
});

// Route to get weather data from specific city
app.get("/:country", async (req, res) => {
	let country = uppercaseCity(req.params.country);
	let result = await queryCity(country);
	if (result.length === 0 || result === null || result === "") {
		res.status(400).send({
			error: true,
			message:
				"Please make sure the name of the city is valid. Refer to city-list.json for references",
		});
	} else {
		res.status(200).send({ result });
	}
});

// custom 404 error handling
app.use((req, res, next) => {
	error = {
		error: true,
		message: "The following URL does not exists",
	};
	res.status(404).send(error);
});

// custom 400 error handling
app.use((req, res, next) => {
	error = { error: true, message: "The following URL is not valid" };
	res.status(400).send(error);
});

// custom 500 error handling
app.use((req, res, next) => {
	error = {
		error: true,
		message: "Something is broken, please contact the administrator",
	};
	res.status(500).send(error);
});

module.exports = app.listen(port);
