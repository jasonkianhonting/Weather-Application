// This function is used to make sure that the names of the city has been uppercased correctly to match the database query
// for example, instead of newyork, it will be New York
function uppercaseCity(text) {
	text = text
		.toLowerCase()
		.split(" ")
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(" ");
	return text;
}

// This function is used to capitalise the country code to match the database query
// for example, instead of us, it will be US
function uppercaseCountryCode(text) {
	let name = text.toUpperCase();
	return name;
}
module.exports = { uppercaseCity, uppercaseCountryCode };
