const { uppercaseCity, uppercaseCountryCode } = require("../helpers");

// Test cases for the testing of helpers functions found in helpers.js
describe("Helpers Testing", () => {
	it("Check to see the city has been capitalise correctly", () => {
		let city = "london";
		const finalResult = uppercaseCity(city);
		expect(finalResult).toBe("London");
	});

	it("Check to see the country code has been capitalise correctly", () => {
		let countryCode = "gb";
		const finalResult = uppercaseCountryCode(countryCode);
		expect(finalResult).toBe("GB");
	});

	it("Check to see the country code has been capitalise correctly with inconsistent alphabets", () => {
		let countryCode = "gB";
		const finalResult = uppercaseCountryCode(countryCode);
		expect(finalResult).toBe("GB");
	});

	it("Check to see the city has been capitalise correctly with inconsistent alphabets", () => {
		let city = "loNdOn";
		const finalResult = uppercaseCity(city);
		expect(finalResult).toBe("London");
	});

	it("Check to see the city has been capitalise correctly with cities name that has a white space", () => {
		let city = "new york";
		const finalResult = uppercaseCity(city);
		expect(finalResult).toBe("New York");
	});
});
