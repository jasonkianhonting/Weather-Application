const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);

// Test cases for the  testing of API endpoint found in index.js
describe("API Endpoint Testing", () => {
	it("Check to see if the default endpoint works", async () => {
		const res = await request.get("/");
		expect(res.status).toBe(200);
	});

	it("Check to see if the query endpoint works", async () => {
		const res = await request.get("/london/gb");
		expect(res.status).toBe(200);
	});

	it("Check to see if the query endpoint works after inputting the wrong parameters", async () => {
		const res = await request.get("/london/us");
		expect(res.status).toBe(400);
		expect(res.body.message).toBe(
			"Please make sure your city and country code are valid. Refer to city-list.json for references"
		);
	});

	it("Check to see if error message was given for invalid route", async () => {
		const res = await request.get("////");
		expect(res.status).toBe(404);
		expect(res.body.message).toBe("The following URL does not exists");
	});

	it("Check to see if special characters can be used in the URL", async () => {
		const res = await request.get("/@#$@/&^*");
		expect(res.status).toBe(400);
		expect(res.body.message).toBe(
			"Please make sure the name of the city is valid. Refer to city-list.json for references"
		);
	});
});

// Making sure to close the app so that it doessn't cause tests to leak
afterAll(() => {
	app.close();
});
