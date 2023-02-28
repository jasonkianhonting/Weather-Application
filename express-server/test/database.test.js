const { connectDatabase, getAllData, queryDatabase } = require("../database");

// Make sure to connect the API with the database
beforeEach(async () => {
	await connectDatabase;
});

// Test cases for the testing of database
describe("Database Testing", () => {
	it("Check to see if the API can retrieve all data from database", async () => {
		let results = await getAllData();
		expect(results).not.toBeNull();
	});

	it("Check to see if the API can retrieve specific data from database", async () => {
		let results = await queryDatabase("New York", "US");
		expect(results).not.toBeNull();
	});

	it("Check to see if the API handles bad query", async () => {
		let results = await queryDatabase("wdwewjfnwjd", "wdewdw");
		expect(results).toHaveLength(0);
	});

	it("Check to see if the API handles bad query(special characters)", async () => {
		let results = await queryDatabase("#$%^$#", "#$$%#");
		expect(results).toHaveLength(0);
	});
});
